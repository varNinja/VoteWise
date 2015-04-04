-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2015 at 01:03 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `votewise_vw`
--
CREATE DATABASE IF NOT EXISTS `votewise_vw` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `votewise_vw`;

-- --------------------------------------------------------

--
-- Table structure for table `alog`
--
-- Creation: Jul 11, 2014 at 10:29 PM
-- Last update: Jul 11, 2014 at 09:29 PM
--

DROP TABLE IF EXISTS `alog`;
CREATE TABLE IF NOT EXISTS `alog` (
  `alogid` char(12) NOT NULL,
  `tname` varchar(100) NOT NULL,
  `aed` varchar(1) NOT NULL,
  `changes` varchar(1024) NOT NULL,
  `crdt` datetime DEFAULT NULL,
  `crdtid` char(12) NOT NULL DEFAULT '0',
  `updt` datetime DEFAULT NULL,
  `updtid` char(12) NOT NULL DEFAULT '0',
  `delmark` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`alogid`),
  KEY `alogid` (`alogid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='Activity Log';

-- --------------------------------------------------------

--
-- Table structure for table `answ`
--
-- Creation: Jul 11, 2014 at 10:29 PM
-- Last update: Jul 11, 2014 at 09:29 PM
--

DROP TABLE IF EXISTS `answ`;
CREATE TABLE IF NOT EXISTS `answ` (
  `answid` char(12) NOT NULL DEFAULT '0',
  `quesid` char(12) NOT NULL DEFAULT '0',
  `userid` char(12) NOT NULL DEFAULT '0',
  `agree` tinyint(1) NOT NULL DEFAULT '0',
  `rank` tinyint(1) NOT NULL DEFAULT '0',
  `comment` varchar(255) NOT NULL,
  `inans` varchar(100) NOT NULL,
  `rankid` char(12) NOT NULL DEFAULT '0',
  `chgreason` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `chgcomment` varchar(1024) NOT NULL,
  `crdt` datetime DEFAULT NULL,
  `crdtid` char(12) NOT NULL DEFAULT '0',
  `updt` datetime DEFAULT NULL,
  `updtid` char(12) NOT NULL DEFAULT '0',
  `delmark` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`answid`),
  KEY `answid` (`answid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bkgr`
--
-- Creation: Jul 11, 2014 at 10:29 PM
-- Last update: Jul 11, 2014 at 09:29 PM
--

DROP TABLE IF EXISTS `bkgr`;
CREATE TABLE IF NOT EXISTS `bkgr` (
  `bkgrid` char(12) NOT NULL DEFAULT '0',
  `desc` varchar(2500) NOT NULL,
  `crdt` datetime DEFAULT NULL,
  `crdtid` char(12) NOT NULL DEFAULT '0',
  `updt` datetime DEFAULT NULL,
  `updtid` char(12) NOT NULL DEFAULT '0',
  `delmark` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`bkgrid`),
  KEY `bkgrid` (`bkgrid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `issu`
--
-- Creation: Jul 11, 2014 at 10:29 PM
-- Last update: Jul 11, 2014 at 09:29 PM
--

DROP TABLE IF EXISTS `issu`;
CREATE TABLE IF NOT EXISTS `issu` (
  `issuid` char(12) NOT NULL DEFAULT '0',
  `desc` varchar(1024) NOT NULL,
  `order` char(12) NOT NULL,
  `crdt` datetime DEFAULT NULL,
  `crdtid` char(12) NOT NULL DEFAULT '0',
  `updt` datetime DEFAULT NULL,
  `updtid` char(12) NOT NULL DEFAULT '0',
  `delmark` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`issuid`),
  KEY `issuid` (`issuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ques`
--
-- Creation: Jul 11, 2014 at 10:29 PM
-- Last update: Jul 11, 2014 at 09:29 PM
--

DROP TABLE IF EXISTS `ques`;
CREATE TABLE IF NOT EXISTS `ques` (
  `quesid` char(12) NOT NULL DEFAULT '0',
  `desc` varchar(2500) NOT NULL,
  `order` char(12) NOT NULL,
  `bkgrid` char(12) NOT NULL DEFAULT '0',
  `qtype` tinyint(4) unsigned NOT NULL,
  `amttext` char(24) NOT NULL DEFAULT '',
  `amttype` char(1) NOT NULL DEFAULT '',
  `crdt` datetime DEFAULT NULL,
  `crdtid` char(12) NOT NULL DEFAULT '0',
  `updt` datetime DEFAULT NULL,
  `updtid` char(12) NOT NULL DEFAULT '0',
  `delmark` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`quesid`),
  KEY `quesid` (`quesid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `rank`
--
-- Creation: Jul 11, 2014 at 10:29 PM
-- Last update: Jul 11, 2014 at 09:29 PM
--

DROP TABLE IF EXISTS `rank`;
CREATE TABLE IF NOT EXISTS `rank` (
  `rankid` char(12) NOT NULL DEFAULT '0',
  `userid` char(12) NOT NULL DEFAULT '0',
  `quesid` char(12) NOT NULL DEFAULT '0',
  `crdt` datetime DEFAULT NULL,
  `crdtid` char(12) NOT NULL DEFAULT '0',
  `updt` datetime DEFAULT NULL,
  `updtid` char(12) NOT NULL DEFAULT '0',
  `delmark` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`rankid`),
  KEY `rankid` (`rankid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--
-- Creation: Jul 11, 2014 at 10:29 PM
-- Last update: Jul 11, 2014 at 09:29 PM
--

DROP TABLE IF EXISTS `topic`;
CREATE TABLE IF NOT EXISTS `topic` (
  `topicid` char(12) NOT NULL DEFAULT '0',
  `desc` varchar(1024) NOT NULL,
  `stop` char(12) NOT NULL,
  `order` char(12) NOT NULL,
  `crdt` datetime DEFAULT NULL,
  `crdtid` char(12) NOT NULL DEFAULT '0',
  `updt` datetime DEFAULT NULL,
  `updtid` char(12) NOT NULL DEFAULT '0',
  `delmark` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`topicid`),
  KEY `topicid` (`topicid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--
-- Creation: Jul 11, 2014 at 10:29 PM
-- Last update: Jul 11, 2014 at 09:29 PM
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userid` char(12) NOT NULL DEFAULT '0',
  `uname` varchar(10) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `email` varchar(75) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `bname` varchar(12) NOT NULL,
  `fname` varchar(25) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `utype` char(1) NOT NULL DEFAULT 'G',
  `ulevel` char(3) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `crdt` datetime DEFAULT NULL,
  `crdtid` char(12) NOT NULL DEFAULT '0',
  `updt` datetime DEFAULT NULL,
  `updtid` char(12) NOT NULL DEFAULT '0',
  `delmark` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userid`),
  KEY `userid` (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='Users';

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `uname`, `pwd`, `email`, `phone`, `bname`, `fname`, `lname`, `utype`, `ulevel`, `active`, `crdt`, `crdtid`, `updt`, `updtid`, `delmark`) VALUES
('1', '', '', 'strimble@softyme.com', '', '', 'Sharon', 'Trimble', 'G', '0', 0, '2014-04-26 20:27:57', '1', '2014-04-26 20:27:57', '1', 0),
('2', '', '', 'bcnagle2@gmail.com', '', '', 'Bill', 'Nagle', 'G', '0', 0, '2014-04-26 20:33:42', '1', '2014-04-26 20:33:42', '1', 0),
('3', '', '', 'strible@softyme;com', '', '', 'Sharon', 'T', 'G', '0', 0, '2014-05-01 11:01:57', '1', '2014-05-01 11:01:57', '1', 0),
('4', '', '', 'spencersnygg@silentmonkeys.com', '', '', 'joe', 'pigglywqiggly', 'G', '0', 0, '2014-05-21 16:32:19', '1', '2014-05-21 16:32:19', '1', 0),
('5', '', '', 'dfgh@fghjkl', '', '', 'poygopijok', 'fghjk', 'G', '0', 0, '2014-06-13 19:35:38', '1', '2014-06-13 19:35:38', '1', 0),
('6', '', '', '''lkadflkjgad@kl;sdhsge', '', '', 'pdjfg', 'dfg'';dlkjfg', 'G', '0', 0, '2014-06-28 13:38:08', '1', '2014-06-28 13:38:08', '1', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
