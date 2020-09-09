-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: groupomia
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `imageURL` varchar(512) DEFAULT NULL,
  `author_users_id` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'<h3>Groupe de travail</h3><p>Venez participer à la refonte de notre CRM ! Un groupe de travail sera organisé et se réunira tous les lundis matin. Rapprochez-vous de votre manager si vous êtes intéressés.</p>','http://localhost:3000/images/jo-szczepanska-5aiRb5f464A-unsplash.jpg1599666254351.jpg',1,'2020-09-09 17:44:14'),(2,'<h3>Pot de départ</h3><p>Comme vous le savez, je quitte la société à la fin du mois. Et j\'organise à cette occasion un pot de départ le 29 septembre à 17h en salle Ulysse.</p><p>Venez nombreux !</p>','http://localhost:3000/images/adi-goldstein-Hli3R6LKibo-unsplash.jpg1599667893425.jpg',3,'2020-09-09 18:11:33'),(3,'<h3>Masques</h3><p>Des masques sont disponibles pour l\'ensemble des collaborateurs à l\'accueil. N\'hésitez pas à en demander !</p>','http://localhost:3000/images/vera-davidova-cuzH5S-8ZOQ-unsplash.jpg1599667985458.jpg',4,'2020-09-09 18:13:05'),(4,'<h3>Naissance</h3><p>Caroline Martin a donné naissance à une petit fille prénommée Jeanne le 5 septembre.</p><p>Une cagnotte est ouverte au service formation.</p>','http://localhost:3000/images/peter-oslanec-Mu6RjGUzrQA-unsplash.jpg1599668070779.jpg',5,'2020-09-09 18:14:30'),(5,'<h3>Place de parking disponible</h3><p>1 place de parking est disponible à partir du 1er octobre. Si cela vous intéresse, veuillez en informer le service RH avant le 15 septembre.</p>','NULL',6,'2020-09-09 18:17:01'),(6,'<h3>Nouvelle salle de réunion</h3><p>Les travaux dans la salle Ulysse sont terminées. Vous pouvez dès maintenant la réserver pour vos réunions !</p>','http://localhost:3000/images/toa-heftiba-FV3GConVSss-unsplash.jpg1599668410746.jpg',7,'2020-09-09 18:20:10');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `articles_id` int DEFAULT NULL,
  `comment` text,
  `author_users_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk2_articles_id` (`articles_id`),
  CONSTRAINT `fk2_articles_id` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,2,'Bonne continuation !',4,'2020-09-09'),(2,3,'De combien de masques disposons-nous?',5,'2020-09-09'),(3,4,'Félicitations à Caro !',4,'2020-09-09'),(4,5,'Quels sont les critères pour l\'attribution de cette place?',4,'2020-09-09');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `articles_id` int NOT NULL,
  `users_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  UNIQUE KEY `id` (`id`),
  KEY `fk_users_id` (`users_id`),
  KEY `fk_articles_id` (`articles_id`),
  CONSTRAINT `fk_articles_id` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (4,6,1),(3,6,2),(2,6,3),(1,6,4),(5,7,5),(4,7,6),(3,7,7),(2,4,8),(1,4,9);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'basic_user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `password` varchar(256) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `karma` int NOT NULL DEFAULT '1',
  `role_id` int DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@groupomia.fr','$2b$10$w7Z.rNTn1JOvcP2H4M8t/uamhIvVyeWyRonwrNZER2Q3XqD.nUfKO','Galland','Véronique',0,1),(3,'jcaillaud@groupomia.fr','$2b$10$cJF6VC.RsU28R6KyLALuM.Q0hcACrAVAWl/NixMVQLp9beIatsWrm','Caillaud','Julie',0,2),(4,'pmartin@groupomia.fr','$2b$10$Adi2jWLLX5ZPCIumktzV9O7OvwTE6w8S3DaDwnF6H0Maf1i2YBt.K','Martin','Paul',0,2),(5,'sramault@groupomia.fr','$2b$10$prswBmSRX9./6Nq1U9lnzu7949dhhNLP1v1ClVNQ9MzrkP9nZC93a','Ramault','Sophie',0,2),(6,'mleduc@groupomia.fr','$2b$10$HrbZd9BXtRlsoYzaobA.LurdNFcHpAxzAun1gutOhxQlhyqeTK3tK','Leduc','Marion',0,2),(7,'drigal@groupomia.fr','$2b$10$2O9skVnpZwddlc83fLEEceuWczHWpRxnMTnD7E67jDPVcJOT8Deli','Rigal','Delphine',0,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-09 18:51:14
