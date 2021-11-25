INSERT INTO users (name, email, password)
VALUES ('jojo Rabbit', 'jojorabbit@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
, ('Bigoodi Boo', 'bigoodiboo@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
, ('Jafar Chosoo', 'jafarchosoo@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
, ('John Mkdir', 'johnmkdir@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
,('Hello world', 'helloworld@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,number_of_bedrooms, country, street, city, province, post_code)

VALUES
  (
  1,
  'Burns Mansion',
  'description',
  'https://media.discordapp.net/attachments/906056340131184720/912803905539301486/20211123_123647.jpg?width=810&height=1080',
  'https://media.discordapp.net/attachments/906056340131184720/912803905539301486/20211123_123647.jpg?width=810&height=1080',
  2.99,
  2,
  8,
  9,
  'Canada',
  '3634 Scotts Lane',
  'Cumberland',
  'British Columbia',
  'V0R 1S0'
), (
  2,
  'Santiago Creek',
  'description',
  'https://media.discordapp.net/attachments/906056340131184720/912803905539301486/20211123_123647.jpg?width=810&height=1080',
  'https://media.discordapp.net/attachments/906056340131184720/912803905539301486/20211123_123647.jpg?width=810&height=1080',
  782.99,
  2,
  5,
  2,
  'Canada',
  '2956 Broadmoor Blvd',
  'Sherwood Park',
  'Alberta',
  'T8A 1V6'
), (
  3,
  'Ramona Flowers',
  'description',
  'https://media.discordapp.net/attachments/906056340131184720/912803905539301486/20211123_123647.jpg?width=810&height=1080',
  'https://media.discordapp.net/attachments/906056340131184720/912803905539301486/20211123_123647.jpg?width=810&height=1080',
  999.99,
  1,
  5,
  3,
  'Canada',
  '3293 Bridgeport Rd',
  'Orangeville',
  'Ontario',
  'L9W 2C8'
);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES 
  ('2018-02-12T08:00:00.000Z', '2018-03-12T08:00:00.000Z', 1, 3)
, ('2018-02-12T08:00:00.000Z', '2018-03-12T08:00:00.000Z', 2, 1)
, ('2018-02-12T08:00:00.000Z', '2018-03-12T08:00:00.000Z', 3, 4)
, ('2018-02-12T08:00:00.000Z', '2018-03-12T08:00:00.000Z', 2, 2)
, ('2018-02-12T08:00:00.000Z', '2018-03-12T08:00:00.000Z', 1, 5); 


INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES (1, 3, 2, 10, 'message'), (2, 2, 4, 2, 'message'), (3, 3, 1, 4, 'message'), (4, 3, 5, 7, 'message');