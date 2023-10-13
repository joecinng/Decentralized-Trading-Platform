-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2023 at 05:42 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `current_price` decimal(15,2) NOT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'NFT',
  `availability` boolean DEFAULT true
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `assets` (`id`, `name`, `description`, `current_price`, `image_url`, `category`) VALUES
(1, 'ArtWork Maniac', 'Artwork by Josephine Galara', '3.00', 'https://source.unsplash.com/random/art?1', 'Art'),
(2, 'Dania Maniac', 'Artwork by Stefan Giago', '3.00', 'https://source.unsplash.com/random/art?2', 'Art'),
(3, "Nature\'s Abstract", 'Abstract art showcasing the beauty of nature.', '4.00', 'https://source.unsplash.com/random/art?3', 'NFT'),
(4, 'Geometric Magic', 'Artwork focusing on geometric patterns.', '5.00', 'https://source.unsplash.com/random/art?4', 'Art'),
(5, 'Galactic Dreams', 'Art inspired by the wonders of the universe.', '6.00', 'https://source.unsplash.com/random/art?5', 'NFT'),
(6, 'Emotion Spectrum', 'Art that mirrors the complexity of human emotions.', '3.50', 'https://source.unsplash.com/random/art?6', 'NFT'),
(7, 'Eternal Clock', "An artistic representation of time\'s relentless march.", '7.00', 'https://source.unsplash.com/random/art?7', 'NFT'),
(8, 'Summer Palette', "A colorful depiction of summer\'s joy.", '4.50', 'https://source.unsplash.com/random/art?8', 'NFT'),
(9, 'Color Waltz', 'The dance of colors on a canvas.', '5.50', 'https://source.unsplash.com/random/art?9', 'Fantom'),
(10, 'Winter Calm', 'The serenity of winter captured in art.', '4.00', 'https://source.unsplash.com/random/art?10', 'Music');

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `email`, `password`, `balance`, `address`) VALUES
(2, '103804245@student.swin.edu.au', 'admin', 3, '0x57fd8b19fd5ab8db14b70f890ef4d0ded2739bd2'),
(3, '102765534@student.swin.edu.au', 'admin', null, null);

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL DEFAULT 1,
  `asset_id` int(11) NOT NULL, 
  `hash` char(64) NOT NULL,
  `received` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Pending','Confirmed','Denied') DEFAULT 'Pending',
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_asset_id` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `transactions` (`transaction_id`, `user_id`, `asset_id`, `hash`, `received`, `status`) VALUES
(32, 2, 1, '918988', '2023-10-03 05:26:08', 'Pending'),
(33, 2, 2, '918988', '2023-10-03 05:26:08', 'Pending'),
(34, 2, 7, '959472', '2023-10-03 05:26:38', 'Confirmed'),
(35, 2, 4, '959472', '2023-10-03 05:26:38', 'Confirmed');