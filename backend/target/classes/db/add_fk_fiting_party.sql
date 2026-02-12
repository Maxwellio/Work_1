-- Миграция: внешний ключ fiting.cnt -> party.col_party
-- Связывает таблицу патрубков/труб с таблицей партий (количество деталей).
--
-- ВАЖНО: перед выполнением убедитесь, что все значения fiting.cnt
-- присутствуют в party.col_party. Иначе миграция завершится с ошибкой.
--
-- Проверка перед выполнением:
-- SELECT cnt FROM substitute.fiting WHERE cnt IS NOT NULL AND cnt NOT IN (SELECT col_party FROM substitute.party);

ALTER TABLE substitute.fiting
ADD CONSTRAINT fk_fiting_party
FOREIGN KEY (cnt) REFERENCES substitute.party(col_party);
