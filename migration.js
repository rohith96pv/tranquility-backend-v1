// migration.js

exports.up = pgm => {
    // Users table
    pgm.createTable('users', {
        userid: 'id',
        username: { type: 'varchar(255)', notNull: true },
        passwordhash: { type: 'text', notNull: true },
        email: { type: 'varchar(255)', notNull: true, unique: true },
        datecreated: { type: 'timestamp', notNull: true },
        lastlogin: { type: 'timestamp' }
    });

    // Demographics table
    pgm.createTable('demographics', {
        demographicsid: 'id',
        userid: { type: 'int', notNull: true, references: '"users"', onDelete: 'cascade' },
        age: { type: 'int' },
        gender: { type: 'varchar(50)' },
        location: { type: 'varchar(255)' },
        educationlevel: { type: 'varchar(255)' },
        employmentstatus: { type: 'varchar(255)' }
    });

    // Mood questionnaire table
    pgm.createTable('moodquestionnaire', {
        questionnaireid: 'id',
        userid: { type: 'int', notNull: true, references: '"users"', onDelete: 'cascade' },
        datetimefilled: { type: 'timestamp', notNull: true },
        moodscore: { type: 'int' },
        stresslevel: { type: 'int' },
        sleepquality: { type: 'int' }
    });

    // Media content table
    pgm.createTable('mediacontent', {
        mediaid: 'id',
        mediatype: { type: 'varchar(255)' },
        mediaurl: { type: 'text' },
        description: { type: 'text' },
        uploaddatetime: { type: 'timestamp' }
    });

    // User interaction feedback table
    pgm.createTable('userinteractionfeedback', {
        interactionid: 'id',
        userid: { type: 'int', notNull: true, references: '"users"', onDelete: 'cascade' },
        mediaid: { type: 'int', notNull: true, references: '"mediacontent"', onDelete: 'cascade' },
        reaction: { type: 'varchar(255)' },
        reactiondatetime: { type: 'timestamp' }
    });

    // Media recommendation table
    pgm.createTable('mediarecommendation', {
        recommendationid: 'id',
        userid: { type: 'int', notNull: true, references: '"users"', onDelete: 'cascade' },
        mediaid: { type: 'int', notNull: true, references: '"mediacontent"', onDelete: 'cascade' },
        recommendeddatetime: { type: 'timestamp' },
        viewed: { type: 'boolean' }
    });
};

exports.down = pgm => {
    // Drop tables in reverse order of creation
    pgm.dropTable('mediarecommendation');
    pgm.dropTable('userinteractionfeedback');
    pgm.dropTable('mediacontent');
    pgm.dropTable('moodquestionnaire');
    pgm.dropTable('demographics');
    pgm.dropTable('users');
};
