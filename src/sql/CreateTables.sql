DROP TABLE IF EXISTS predictions CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;

-- Table: candidates

CREATE TABLE candidates
(
    id SERIAL PRIMARY KEY,
    name text COLLATE pg_catalog."default",
    party text COLLATE pg_catalog."default",
    CONSTRAINT unique_candidate UNIQUE (name, party)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- Table: predictions

CREATE TABLE predictions
(
    id SERIAL PRIMARY KEY,
    string_identifier text COLLATE pg_catalog."default" NOT NULL,
    election_type text COLLATE pg_catalog."default" NOT NULL,
    state text COLLATE pg_catalog."default",
    candidate_id integer,
    dem_seats integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT unique_prediction UNIQUE (string_identifier, election_type, state)
,
    CONSTRAINT predictions_candidate_id_fkey FOREIGN KEY (candidate_id)
        REFERENCES candidates (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE candidates_id_seq
    OWNER TO predictionuser;
ALTER SEQUENCE predictions_id_seq
    OWNER TO predictionuser;
ALTER TABLE candidates
    OWNER to predictionuser;
ALTER TABLE predictions
    OWNER to predictionuser;