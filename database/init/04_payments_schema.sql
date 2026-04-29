-- ============================================================
-- Payment Service Schema
-- Author: Ganga Lova Raju (https://github.com/Gangalovaraju)
-- ============================================================

\c payments_db;

CREATE TABLE IF NOT EXISTS payments (
    id             BIGSERIAL PRIMARY KEY,
    payment_id     VARCHAR(50)   NOT NULL UNIQUE,
    order_number   VARCHAR(30)   NOT NULL,
    amount         NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(30)   NOT NULL,
    status         VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    failure_reason VARCHAR(255),
    processed_at   TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payments_payment_id   ON payments(payment_id);
CREATE INDEX idx_payments_order_number ON payments(order_number);
CREATE INDEX idx_payments_status       ON payments(status);
CREATE INDEX idx_payments_processed_at ON payments(processed_at DESC);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
