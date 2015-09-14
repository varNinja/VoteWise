-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Concurrence Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ALTER TABLE `concurrenceQuestions` 
ADD COLUMN `createdOn` datetime default current_timestamp,
ADD COLUMN `createdBy` integer references users(id),
ADD COLUMN`updatedOn` datetime on update current_timestamp,
ADD COLUMN`updatedBy` integer references users(id);

ALTER TABLE `concurrenceAnswers`
ADD COLUMN `createdOn` datetime default current_timestamp,
ADD COLUMN `createdBy` integer references users(id),
ADD COLUMN `updatedOn` datetime on update current_timestamp,
ADD COLUMN `updatedBy` integer references users(id);



-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Ranking Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ALTER TABLE `rankingQuestions`
ADD COLUMN `createdOn` 	datetime default current_timestamp,
ADD COLUMN `createdBy` 	integer references users(id),
ADD COLUMN `updatedOn` 	datetime on update current_timestamp,
ADD COLUMN `updatedBy` 	integer references users(id)


ALTER table `rankingQuestionItems`
ADD COLUMN    `createdOn` 	datetime default current_timestamp,
ADD COLUMN `createdBy` 	integer references users(id),
ADD COLUMN `updatedOn` 	datetime on update current_timestamp,
ADD COLUMN `updatedBy` 	integer references users(id)


create table `rankingAnswerItems` (
    `createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn`		datetime on update current_timestamp,
	`updatedBy` 	integer references users(id),

    unique (user, item)
);

create table `rankingAnswer` (
	`createdOn` 		datetime default current_timestamp,
	`createdBy` 		integer references users(id),
	`updatedOn`			datetime on update current_timestamp,
	`updatedBy` 		integer references users(id)

)

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Judge Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `judgeQuestions` (
	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

create table `judgeAnswer` (
	`createdOn` 			datetime default current_timestamp,
	`createdBy`	 			integer references users(id),
	`updatedOn` 			datetime on update current_timestamp,
	`updatedBy` 			integer references users(id)
)

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Short Answer Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `shortInputQuestions` (
	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

create table `shortInputAnswers` (
	`createdOn` 		datetime default current_timestamp,
	`createdBy` 		integer references users(id),
	`updatedOn` 		datetime on update current_timestamp,
	`updatedBy` 		integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Backgrounds
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `backgrounds` (
    `createdOn` 		datetime default current_timestamp,
    `createdBy` 		integer not null references users(id),
    `updatedOn` 		datetime on update current_timestamp,
    `updatedBy` 		integer references users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Topics
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `topics`(
	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Users
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `users` (
	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Politicians 
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `politicians` (
`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

create table `politicianAccounts` (
	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

create table `politicianDistricts` (
  	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

-- This would probably constaint stuff like zip, state, etc.
create table `districts` (
	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

