drop table if exists users;
drop table if exists concurrenceQuestions;
drop table if exists concurrenceAnswers;
drop table if exists rankingQuestions;
drop table if exists rankingQuestionItems;
drop table if exists rankingAnswers;
drop table if exists rankingAnswerItems;
drop table if exists judgeQuestions;
drop table if exists judgeAnswers;
drop table if exists shortInputQuestions;
drop table if exists shortInputAnswers;
drop table if exists backgrounds;
drop table if exists topics;
drop table if exists admins;
drop table if exists politicians;
drop table if exists politicianAccounts;
drop table if exists politicianDistricts;
drop table if exists districts;

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Concurrence Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `concurrenceQuestions` (
    `id`          integer primary key auto_increment,
    `background`  integer not null references backgrounds(id),
    `description` text not null,
    `viewOrder`   integer not null
);

create table `concurrenceAnswers` (
    `id`                  integer primary key auto_increment,
    `question`            integer not null references concurrenceQuestions(id),
    `user`                integer not null references users(id),
    `concurrence`         integer not null,
    `importance`          integer not null,
    `comment`             text,
    `previousComment`     text,
    `previousConcurrence` integer,
    `previousImportance`  integer,
    `changeReason`        text,

    unique (question, user)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Ranking Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `rankingQuestions` (
    `id`          integer primary key auto_increment,
    `background`  integer not null references backgrounds(id),
    `description` text not null
);

create table `rankingQuestionItems` (
    `id`       integer primary key auto_increment,
    `question` integer not null references rankingQuestions(id),
    `item`     text not null
);

create table `rankingAnswerItems` (
    `id`           integer primary key auto_increment,
    `user`         integer not null references users(id),
    `item`         integer not null references rankingQuestionItems(id),
    `rank`         integer,
    `previousRank` integer,
    `changeReason` text,
    unique (user, item)
);

create table `rankingAnswers` (
    `id`                 integer primary key auto_increment,
    `user`               integer not null references users(id),
    `question`           integer not null references rankingQuestion(id),
    `importance`         integer not null,
    `comment`            text,
    `previousImportance` integer,
    `previousComment`    text,
    `changeReason`       text
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Judge Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `judgeQuestions` (
    `id`          integer primary key auto_increment,
    `background`  integer not null references backgrounds(id),
    `description` text not null
);

create table `judgeAnswers` (
    `id`                  integer primary key auto_increment,
    `user`                integer not null references users(id),
    `question`            integer not null references judgeQuestions(id),
    `concurrence`         integer not null,
    `importance`          integer not null,
    `lawSpirit`           integer,
    `lawLetter`           integer,
    `lawPrecedent`        integer,
    `lawSocialNeed`       integer,
    `comment`             text,
    `previousImportance`  integer,
    `previousConcurrence` integer,
    `previousComment`     text,
    `changeReason`        text
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Short Answer Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `shortInputQuestions` (
    `id`          integer primary key auto_increment,
    `background`  integer not null references backgrounds(id),
    `description` text not null
);

create table `shortInputAnswers` (
    `id`                 integer primary key auto_increment,
    `question`           integer not null references shortInputQuestions,
    `answer`             text not null,
    `comment`            text,
    `importance`         integer,
    `previousAnswer`     text not null,
    `changeReason`       text,
    `previousComment`    text,
    `previousImportance` integer
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Backgrounds
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `backgrounds` (
    `id`               integer primary key auto_increment,
    `shortDescription` text not null,
    `description`      text not null
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Topics
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `topics`(
    `id`          integer primary key auto_increment,
    `background`  integer not null references backgrounds(id),
    `parent`      integer null references topics(id),
    `viewOrder`   integer not null,
    `description` text not null
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Users
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `users` (
    `id`             integer primary key auto_increment,
    `userName`       varchar(20) not null,
    `passwordHash`   varchar(20) not null,
    `passwordSalt`   varchar(20) not null,
    `email`          varchar(75) not null,
    `phone`          varchar(20),
    `firstName`      varchar(25),
    `lastName`       varchar(50),
    `userType`       char(1),
    `userLevel`      char(3),
    `active`         tinyint(1),
    `politicianInfo` integer references politicians(id),
    unique index (userName)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Admin
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `admins` (
    `id`           integer primary key auto_increment,
    `userName`     text not null,
    `passwordhash` varchar(20) not null,
    `passwordSalt` varchar(20) not null,
    `email`        varchar(75) not null,
    `phone`        varchar(20),
    `firstName`    varchar(25),
    `lastName`     varchar(50),
    `userType`     char(1),
    `userLevel`    char(3),
    `active`       tinyint(1)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Politicians 
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `politicians` (
    `id`           integer primary key auto_increment,
    `party`        text not null,
    `office`       text not null,
    `incumbent`    boolean not null,
    `bio`          text not null,
    `endorsements` text not null,
    `essay`        text
);

create table `politicianDistricts` (
    `politician` integer not null references politicians(id),
    `district`   integer not null references districts(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Districts 
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `districts` (
    `id`   integer primary key auto_increment,
    `name` text not null
);

