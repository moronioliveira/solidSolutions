CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

GRANT INSERT ON public.contact_submissions TO anon, authenticated;

DROP POLICY IF EXISTS "Visitors can submit contact requests" ON public.contact_submissions;
CREATE POLICY "Visitors can submit contact requests" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(company) <= 150
    AND service IN ('Site institucional','Landing page','Ainda não sei')
    AND char_length(message) BETWEEN 10 AND 3000
  );

CREATE OR REPLACE FUNCTION public.notify_contact_discord()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
  BEGIN
    PERFORM net.http_post(
      url := 'https://discord.com/api/webhooks/1560470230948380702/3MOgrlt1zbGFzQ8jBvub2YE0Y3yRYey6FhWh9i2noeO_0Z60i-l5zxxjwbL9Xi83gfDe',
      headers := '{"Content-Type":"application/json"}'::jsonb,
      body := jsonb_build_object(
        'username','Solid Solutions',
        'allowed_mentions', jsonb_build_object('parse','[]'::jsonb),
        'embeds', jsonb_build_array(jsonb_build_object(
          'title','Novo pedido de projeto pelo site',
          'color', 16096779,
          'timestamp', to_char(NEW.created_at AT TIME ZONE 'UTC','YYYY-MM-DD"T"HH24:MI:SS"Z"'),
          'fields', jsonb_build_array(
            jsonb_build_object('name','Nome','value',left(NEW.name,256),'inline',true),
            jsonb_build_object('name','Empresa','value',coalesce(nullif(left(NEW.company,256),''),'—'),'inline',true),
            jsonb_build_object('name','Serviço','value',NEW.service,'inline',true),
            jsonb_build_object('name','E-mail','value',left(NEW.email,256)),
            jsonb_build_object('name','Mensagem','value',left(NEW.message,1000))
          )
        ))
      )
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'discord notify failed: %', SQLERRM;
  END;
  RETURN NEW;
END $$;

REVOKE EXECUTE ON FUNCTION public.notify_contact_discord() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS contact_submission_discord ON public.contact_submissions;
CREATE TRIGGER contact_submission_discord AFTER INSERT ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.notify_contact_discord();