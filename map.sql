-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 28 2016 г., 21:36
-- Версия сервера: 5.5.50
-- Версия PHP: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `map`
--

-- --------------------------------------------------------

--
-- Структура таблицы `places`
--

CREATE TABLE IF NOT EXISTS `places` (
  `id_place` int(11) NOT NULL,
  `name_place` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `coordinateX` float NOT NULL,
  `coordinateY` float NOT NULL,
  `address` varchar(255) NOT NULL,
  `id_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `places`
--

INSERT INTO `places` (`id_place`, `name_place`, `description`, `coordinateX`, `coordinateY`, `address`, `id_type`) VALUES
(1, 'Евроопт', 'Классный магазин', 53.6605, 23.7815, 'ул. Ольги Соломовой, 131', 3),
(2, 'Аптека номер 3', 'Полезная аптека', 53.662, 23.782, 'ул. Фолюш, 15/204a', 1),
(3, 'Евроопт', 'Магазин', 53.7082, 23.8479, 'ул. Лиможа, 11', 3),
(4, 'Евроопт', 'Магазин', 53.6667, 23.7889, 'ул. Соломовой, 70', 3),
(5, 'Алми', 'Магазин', 53.6722, 23.8632, 'пр. Космонавтов, 81', 3),
(6, 'Алми', 'Магазин', 53.6719, 23.7987, 'ул. Советских Пограничников, 110A', 3),
(6, 'Алми', 'Магазин', 53.6719, 23.7987, 'ул. Советских Пограничников, 110A', 3),
(7, 'Алми', 'Магазин', 53.6565, 23.781, 'ул. Соломовой, 112', 3),
(8, 'Алми', 'Магазин', 53.7115, 23.8489, 'ул. Лиможа, 32Б', 3),
(9, 'Евроопт', 'Магазин', 53.6561, 23.8024, 'ул. Суворова, 216', 3),
(11, 'Евроопт', 'Магазин', 53.647, 23.8454, 'пр. Клецкова, 11', 3),
(10, 'Рублевский', 'Магазин', 53.6445, 23.8588, 'ул. Кабяка, 23', 3),
(12, 'Аптека', 'Аптека в Гродно', 53.6854, 23.8435, 'ул. Элизы Ожешко, 41', 1),
(13, 'Аптека', 'Аптека в Гродно', 53.6604, 23.8125, 'ул. Суворова, 21', 1),
(14, 'Аптека', 'Аптека в Гродно', 53.6477, 23.8312, 'ул. Славинского, 5', 1),
(15, 'Аптека', 'Аптека в Гродно', 53.7127, 23.8502, 'ул. Лиможа, 41', 1),
(16, 'Аптека', 'Аптека в Гродно', 53.6656, 23.7891, 'ул. Лизы Чайкиной, 45', 1),
(17, 'Аптека', 'Аптека в гродно', 53.7054, 23.7977, 'ул. Домбровского, 47', 1),
(18, 'Галактика', 'Клуб', 53.6745, 23.8519, 'пр. Космонавтов, 41', 2),
(19, 'Колизей 2000,', 'Клуб', 53.6763, 23.8386, 'ул. Карла Макса, 31', 2),
(20, 'Stop Line', 'Клуб', 53.699, 23.811, 'ул. Врублевского, 1А', 2),
(21, 'Африка', 'Клуб', 53.699, 23.8104, 'ул. Врублевского, 1', 2),
(22, 'Парламент', 'Клуб', 53.6707, 23.8015, 'ул. Поповича, 3', 2),
(23, 'Эполет', 'Клуб', 53.685, 23.8413, 'ул. Победы, 31', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE IF NOT EXISTS `types` (
  `id_type` int(11) NOT NULL,
  `name_type` text NOT NULL,
  `marker_img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`id_type`, `name_type`, `marker_img`) VALUES
(1, 'Аптека', 'antivirus'),
(2, 'Клуб', 'club'),
(3, 'Магазин', 'shop');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `places`
--
ALTER TABLE `places`
  ADD KEY `id_place` (`id_place`),
  ADD KEY `id_type` (`id_type`);

--
-- Индексы таблицы `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id_type`),
  ADD UNIQUE KEY `id_type_2` (`id_type`),
  ADD KEY `id_type` (`id_type`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
