INSERT INTO USER (USERNAME, PASSWORD)
VALUES ('theodor', '$2a$13$otbaJWtgsSBuXT.adJ8ssOLyLStBumKxMXP/3ZEHNZsVl2FM5u79i');
INSERT INTO USER (USERNAME, PASSWORD)
VALUES ('user', '$2a$13$yNuA.OfBqEu1Xs8QU/loAuuVBfeKsWNAWfwX/0wvtp/IhMrxZKtvS');

INSERT INTO AUTH_USER_GROUP (USERNAME, AUTH_GROUP)
VALUES ('theodor', 'USER');
INSERT INTO AUTH_USER_GROUP (USERNAME, AUTH_GROUP)
VALUES ('theodor', 'ADMIN');
INSERT INTO AUTH_USER_GROUP (USERNAME, AUTH_GROUP)
VALUES ('user', 'USER');