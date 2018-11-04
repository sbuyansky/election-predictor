INSERT INTO predictions 
    (string_identifier,
    election_type,
    state,
    candidate_id,
    dem_seats)
SELECT $<string_identifier> AS string_identifier,
        $<election_type> AS election_type,
        $<state> AS state,
        candidates.id AS candidate_id,
        null AS dem_seats
FROM candidates
WHERE candidates.name = $<candidate_name>
AND candidates.party = $<candidate_party>
ON CONFLICT ON CONSTRAINT unique_prediction DO 
UPDATE
SET candidate_id = EXCLUDED.candidate_id;