-- Table: public.candidates

-- DROP TABLE public.candidates;

CREATE TABLE public.candidates
(
    id integer NOT NULL DEFAULT nextval('candidates_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    party text COLLATE pg_catalog."default",
    CONSTRAINT candidates_pkey PRIMARY KEY (id),
    CONSTRAINT unique_candidate UNIQUE (name, party)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.candidates
    OWNER to postgres;

-- Table: public.predictions

-- DROP TABLE public.predictions;

CREATE TABLE public.predictions
(
    id integer NOT NULL DEFAULT nextval('predictions_id_seq'::regclass),
    string_identifier text COLLATE pg_catalog."default" NOT NULL,
    election_type text COLLATE pg_catalog."default" NOT NULL,
    state text COLLATE pg_catalog."default",
    candidate_id integer,
    dem_seats integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT predictions_pkey PRIMARY KEY (id),
    CONSTRAINT unique_prediction UNIQUE (string_identifier, election_type, state)
,
    CONSTRAINT predictions_candidate_id_fkey FOREIGN KEY (candidate_id)
        REFERENCES public.candidates (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.predictions
    OWNER to postgres;