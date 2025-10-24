-- создание таблицы "Мероприятия"
CREATE TABLE public.events (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    total_seats INTEGER NOT NULL
);


-- созданите таблицы "Резервирования"
CREATE TABLE public.bookings (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id),
    user_id VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Уникальность пары "пользователь-событие" (нельзя регистрироваться более одного раза)
    CONSTRAINT unique_event_user UNIQUE(event_id, user_id)
);


-- заполнение таблицы "Мероприятия"
INSERT INTO events (name, total_seats) VALUES
('event1', 1),
('event2', 10),
('event3', 3);
