-- Returns the proportion of students that are in N groups
SELECT
	groupSize,
	CAST(COUNT(id) AS FLOAT)/(SELECT COUNT(id) FROM student)*100 AS studentsPercentage
FROM (
  SELECT student.id, COUNT(student_group.group_id) AS groupSize 
  FROM student
  LEFT JOIN student_group ON student.id = student_group.student_id
  GROUP BY student.id
) AS t1
GROUP BY groupSize
ORDER BY groupSize ASC;

-- Returns the groups created less than a year ago
SELECT *
FROM "group"
WHERE creation_date > (NOW() - INTERVAL '1 year');
