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


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blockmania`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `current_price` decimal(15,2) NOT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'NFT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `name`, `description`, `current_price`, `image_url`, `category`) VALUES
(1, 'ArtWork Maniac', 'Artwork by Josephine Galara', '3.00', 'https://source.unsplash.com/random/art?1', 'Art'),
(2, 'Dania Maniac', 'Artwork by Stefan Giago', '3.00', 'https://source.unsplash.com/random/art?2', 'Art'),
(3, 'Nature\'s Abstract', 'Abstract art showcasing the beauty of nature.', '4.00', 'https://source.unsplash.com/random/art?3', 'NFT'),
(4, 'Geometric Magic', 'Artwork focusing on geometric patterns.', '5.00', 'https://source.unsplash.com/random/art?4', 'Art'),
(5, 'Galactic Dreams', 'Art inspired by the wonders of the universe.', '6.00', 'https://source.unsplash.com/random/art?5', 'NFT'),
(6, 'Emotion Spectrum', 'Art that mirrors the complexity of human emotions.', '3.50', 'https://source.unsplash.com/random/art?6', 'NFT'),
(7, 'Eternal Clock', 'An artistic representation of time\'s relentless march.', '7.00', 'https://source.unsplash.com/random/art?7', 'NFT'),
(8, 'Summer Palette', 'A colorful depiction of summer\'s joy.', '4.50', 'https://source.unsplash.com/random/art?8', 'NFT'),
(9, 'Color Waltz', 'The dance of colors on a canvas.', '5.50', 'https://source.unsplash.com/random/art?9', 'Fantom'),
(10, 'Winter Calm', 'The serenity of winter captured in art.', '4.00', 'https://source.unsplash.com/random/art?10', 'Music');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 1,
  `image_url` varchar(1024) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `hash` char(64) NOT NULL,
  `total` decimal(20,8) NOT NULL,
  `received` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Pending','Confirmed','Denied') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `user_id`, `image_url`, `product_name`, `hash`, `total`, `received`, `status`) VALUES
(32, 2, 'https://source.unsplash.com/random/art?2', 'Dania Maniac', '918988', '3.00000000', '2023-10-03 05:26:08', 'Denied'),
(33, 2, 'https://source.unsplash.com/random/art?3', 'Nature\'s Abstract', '918988', '4.00000000', '2023-10-03 05:26:08', 'Denied'),
(34, 2, 'https://source.unsplash.com/random/art?2', 'Dania Maniac', '959472', '3.00000000', '2023-10-03 05:26:38', 'Pending'),
(35, 2, 'https://source.unsplash.com/random/art?3', 'Nature\'s Abstract', '959472', '4.00000000', '2023-10-03 05:26:38', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `balance`, `address`) VALUES
(2, '103804245@student.swin.edu.au', 'admin', 3, '0x57fd8b19fd5ab8db14b70f890ef4d0ded2739bd2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_reference` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `user_reference` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
