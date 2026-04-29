-- ============================================================
-- Order Service Schema
-- Author: Ganga Lova Raju (https://github.com/Gangalovaraju)
-- ============================================================

\c orders_db;

CREATE TABLE IF NOT EXISTS orders (
    id               BIGSERIAL PRIMARY KEY,
    order_number     VARCHAR(30)    NOT NULL UNIQUE,
    customer_email   VARCHAR(200)   NOT NULL,
    status           VARCHAR(30)    NOT NULL DEFAULT 'PENDING',
    total_amount     NUMERIC(12,2)  NOT NULL CHECK (total_amount >= 0),
    payment_id       VARCHAR(50),
    payment_method   VARCHAR(30),
    notes            TEXT,
    created_at       TIMESTAMP      NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP      NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id           BIGSERIAL PRIMARY KEY,
    order_id     BIGINT         NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    sku_code     VARCHAR(50)    NOT NULL,
    product_name VARCHAR(200)   NOT NULL,
    quantity     INTEGER        NOT NULL CHECK (quantity > 0),
    price        NUMERIC(10,2)  NOT NULL CHECK (price >= 0)
);

-- Indexes
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_order_number   ON orders(order_number);
CREATE INDEX idx_orders_status         ON orders(status);
CREATE INDEX idx_orders_created_at     ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id  ON order_items(order_id);
CREATE INDEX idx_order_items_sku_code  ON order_items(sku_code);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
