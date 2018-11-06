SELECT string_identifier,
       election_type,
       state,
       c.name,
       c.party,
       dem_seats
FROM predictions AS p
LEFT OUTER JOIN candidates AS c
ON p.candidate_id = c.id
WHERE string_identifier IN ($<string_identifiers:csv>);