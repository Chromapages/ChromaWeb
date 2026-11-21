CREATE TABLE intake_requests (
  seq INTEGER PRIMARY KEY AUTOINCREMENT,
  id TEXT NOT NULL UNIQUE,
  reference TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'active', 'in_review', 'done')),
  request_type TEXT NOT NULL CHECK (request_type IN ('prospect', 'client', 'question')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  project_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  message TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX intake_requests_created_at_idx ON intake_requests (created_at DESC, seq DESC);
CREATE INDEX intake_requests_status_idx ON intake_requests (status, created_at DESC, seq DESC);
