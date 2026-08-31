-- Creates the feedback table for storing user survey responses.

CREATE TABLE IF NOT EXISTS feedback (
    id                          SERIAL PRIMARY KEY,
    created_at                  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    license_key_id              TEXT,
    user_name                   TEXT         NOT NULL,
    user_email                  TEXT         NOT NULL,
    usage_frequency             TEXT         NOT NULL,
    missing_or_inconvenient     TEXT,
    pro_features                TEXT[]       NOT NULL,
    pro_features_more_formats   TEXT,
    pro_features_other          TEXT,
    fair_price                  TEXT         NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_feedback_user_email ON feedback (user_email);
