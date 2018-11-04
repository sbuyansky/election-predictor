INSERT INTO predictions 
    (string_identifier,
    election_type,
    state,
    candidate_id,
    dem_seats)
VALUES (
        $<string_identifier>,
        $<election_type>,
        $<state>,
        null,
        $<dem_seats>
    )
ON CONFLICT ON CONSTRAINT unique_prediction DO
UPDATE
SET dem_seats = EXCLUDED.dem_seats;