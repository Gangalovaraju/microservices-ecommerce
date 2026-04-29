-- ============================================================
-- Inventory Service Schema
-- Author: Ganga Lova Raju (https://github.com/Gangalovaraju)
-- ============================================================

\c inventory_db;

CREATE TABLE IF NOT EXISTS products (
    id          BIGSERIAL PRIMARY KEY,
    sku_code    VARCHAR(50)    NOT NULL UNIQUE,
    name        VARCHAR(200)   NOT NULL,
    description TEXT,
    price       NUMERIC(10,2)  NOT NULL CHECK (price >= 0),
    quantity    INTEGER        NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    category    VARCHAR(100),
    image_url   VARCHAR(500),
    created_at  TIMESTAMP      NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP      NOT NULL DEFAULT NOW()
);

-- Indexes for frequent query patterns
CREATE INDEX idx_products_sku_code  ON products(sku_code);
CREATE INDEX idx_products_category  ON products(category);
CREATE INDEX idx_products_quantity  ON products(quantity);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Seed Data ──────────────────────────────────────────────
INSERT INTO products (sku_code, name, description, price, quantity, category) VALUES
('LAPTOP-MBP-M3',  'MacBook Pro M3 14"',        'Apple M3 chip, 16GB RAM, 512GB SSD, Liquid Retina display',          1999.99, 25,  'Laptops'),
('LAPTOP-DELL-XPS', 'Dell XPS 15 OLED',          'Intel Core i9, 32GB RAM, 1TB SSD, 4K OLED display',                 1799.99, 18,  'Laptops'),
('LAPTOP-LG-GRAM',  'LG Gram 17" Lightweight',   '13th Gen Intel i7, 16GB RAM, 512GB SSD, under 1.35kg',              1299.99, 30,  'Laptops'),
('PHONE-IP15PRO',   'iPhone 15 Pro Max',          'A17 Pro chip, titanium design, 48MP camera, USB-C',                 1199.99, 50,  'Phones'),
('PHONE-S24ULTRA',  'Samsung Galaxy S24 Ultra',   'Snapdragon 8 Gen 3, 200MP camera, built-in S Pen',                  1299.99, 40,  'Phones'),
('PHONE-PIX8PRO',   'Google Pixel 8 Pro',         'Google Tensor G3, pure Android 14, best-in-class AI features',       999.99, 35,  'Phones'),
('HEAD-SONY-XM5',   'Sony WH-1000XM5',            'Industry-leading noise cancellation, 30hr battery, LDAC support',    349.99, 60,  'Audio'),
('HEAD-BOSE-QC45',  'Bose QuietComfort 45',       'World-class ANC, 24hr battery, comfortable all-day wear',            279.99, 55,  'Audio'),
('HEAD-APP-AIRMAX', 'Apple AirPods Max',          'High-fidelity audio, Adaptive EQ, Transparency mode',               499.99, 30,  'Audio'),
('TAB-IPAD-PRO',    'iPad Pro M2 12.9"',          'M2 chip, Liquid Retina XDR, ProMotion 120Hz, USB-C Thunderbolt',    1099.99, 20, 'Tablets'),
('TAB-SAMS-S9',     'Samsung Galaxy Tab S9 Ultra','Dynamic AMOLED 2X, Snapdragon 8 Gen 2, 14.6" display',              1099.99, 22, 'Tablets'),
('WATCH-AW-S9',     'Apple Watch Series 9',       'S9 chip, Double Tap, crash detection, ECG, blood oxygen',            399.99, 45, 'Wearables'),
('WATCH-SAMS-GW6',  'Samsung Galaxy Watch 6',     'Advanced health monitoring, Wear OS, sapphire crystal glass',        299.99, 50, 'Wearables'),
('KEY-MX-KEYS',     'Logitech MX Keys S',         'Advanced wireless keyboard, smart backlighting, cross-device',        109.99, 80, 'Accessories'),
('MOUSE-MX-MASTER', 'Logitech MX Master 3S',      'Ergonomic wireless mouse, 8K DPI, MagSpeed scroll, silent clicks',    99.99, 90, 'Accessories');
