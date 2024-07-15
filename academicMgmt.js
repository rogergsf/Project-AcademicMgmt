const readlineSync = require("readline-sync");

const teachers = [];
const subjects = [];
const students = [];

function menu() {
    console.log(`<- Academic management system! ->\n
    1 - Register teachers
    2 - Register subjects
    3 - Register students
    4 - List subjects
    5 - List teachers
    6 - List students
    7 - List students by subject
    8 - List subjects by teachers
    9 - List students by teachers
    0 - Exit\n`);

    let option = readlineSync.questionInt("Choose an option: ");

    switch (option) {
        case 1:
            console.clear();
            registerTeacher();
            break;

        case 2:
            console.clear();
            registerSubject();
            break;

        case 3:
            console.clear();
            registerStudents();
            break;

        case 4:
            console.clear();
            listSubjects();
            break;

        case 5:
            console.clear();
            listTeachers();
            break;

        case 6:
            console.clear();
            listStudents();
            break;

        case 7:
            console.clear();
            listStudentsBySubject();
            break;

        case 8:
            console.clear();
            listSubjectsByTeacher();
            break;

        case 9:
            console.clear();
            listStudentsByTeacher();
            break;

        case 0:
            console.clear();
            console.log("Exiting...");
            break;

        default:
            console.clear();
            console.error("Invalid option!");
            setTimeout(() => {
                console.clear();
                menu();
            }, 2000);
    }
}

// Function to return to the menu after a determined time
function callMenu() {
    setTimeout(() => {
        console.clear();
        menu();
    }, 2000);
}


// Register Teacher
function registerTeacher() {
    console.log(`<- Teacher registration <-\n`);
    let teacherName = readlineSync.question("Enter the teacher's name: ");
    let exists = false;

    for (let i = 0; i < teachers.length; i++) {
        if (teachers[i].name == teacherName) {
            exists = true;
            break;
        }
    }

    if (exists) {
        console.error("\nThis teacher is already registered!");
    } else {
        let teacher = {
            name: teacherName
        }

        teachers.push(teacher);

        console.log("Teacher successfully registered!");
    }
    callMenu();
}


// Register Subject
function registerSubject() {
    console.log(`<- Subject registration <-\n`);
    // Check if there are teachers registered
    if (teachers.length == 0) {
        console.error("There are no registered teachers!");

    } else {
        let subjectName = readlineSync.question("Enter the subject name: ");

        // Check if the subject already exists
        let exists = false;

        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].name == subjectName) {
                exists = true;
                break;
            }
        }

        if (exists) {
            console.error("This subject is already registered!");

        } else {
            let teacherCode = readlineSync.question("Enter the teacher code: ");

            // Check if there is a teacher with this index
            if (teachers[teacherCode] == undefined) {
                console.error("There is no teacher registered with the entered code.");

            } else {
                let subject = {
                    name: subjectName,
                    teacher: teacherCode
                }

                subjects.push(subject);
                console.log("Subject successfully registered!");
            }
        }
    }
    callMenu();
}


// Register Students
function registerStudents() {
    console.log(`<- Student registration <-\n`);
    // Check if there are subjects registered
    if (subjects.length == 0) {
        console.error("There are no registered subjects!");

    } else {
        let studentName = readlineSync.question("Enter the student's name: ");

        // Check if the student is already registered
        let existsStudent = false;

        for (let i = 0; i < students.length; i++) {
            if (students[i].name == studentName) {
                existsStudent = true;
                break;
            }
        }

        if (existsStudent) {
            console.log("This student is already registered!");

            // Ask how many subjects the student will take
        } else {
            let numSubjects = readlineSync.questionInt(`How many subjects will ${studentName} take? `);

            if (numSubjects <= 0 || numSubjects > subjects.length) {
                console.error("Invalid number of subjects!");

            } else {
                let subjectList = [];
                for (let i = 0; i < numSubjects; i++) {
                    let subjectNum = readlineSync.questionInt("Enter the subject code: ");

                    // Fill the array with the codes
                    subjectList.push(subjectNum);

                    // Check if there is a subject with this index
                    if (subjects[subjectNum] == undefined) {
                        console.error("There is no subject registered with the entered code.");
                    }
                }

                // Generate random registration number
                regCode = Math.floor(Math.random() * (10000 - 0 + 0)) + 0;

                let student = {
                    name: studentName,
                    subjects: subjectList,
                    registration: regCode
                }
                students.push(student);
                console.log("Student successfully registered!");
            }
        }
    }
    callMenu();
}


// List Subjects
function listSubjects() {

    if (subjects.length == 0) {
        console.error("There are no registered subjects!");

    } else {
        console.log("<- Registered subjects ->");

        for (let i = 0; i < subjects.length; i++) {
            console.log(`${i} - ${subjects[i].name} - Prof ${teachers[subjects[i].teacher].name}`);
        }
    }
    callMenu();
}


// List Teachers
function listTeachers() {
    if (teachers.length == 0) {
        console.error("There are no registered teachers!");
    } else {
        console.log("<- Registered teachers ->");

        for (let i = 0; i < teachers.length; i++) {
            console.log(`\nCode: ${i} \nName: ${teachers[i].name}`);

            // List the subjects of the teachers
            console.log("Subjects:");
            for (let j = 0; j < subjects.length; j++) {
                if (subjects[j].teacher == i) {
                    console.log(`- ${subjects[j].name}`);
                }
            }
        }
    }
    callMenu();
}


// List Students
function listStudents() {
    if (students.length === 0) {
        console.error("There are no registered students!");

    } else {
        console.log("<- Registered students ->");

        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            console.log(`\nRegistration: ${student.registration} \nName: ${student.name}`);

            // List the subjects of the students
            console.log("Subjects:");
            for (let x = 0; x < student.subjects.length; x++) {
                const code = student.subjects[x];
                const subject = subjects[code];
                console.log("-", subject.name);
            }
        }
    }
    callMenu();
}


// List Students By Subject
function listStudentsBySubject() {
    if (students.length === 0) {
        console.error("There are no registered students!");

    } else {
        const subjectCode = readlineSync.questionInt("Enter the subject code to see its students: ");
        if (subjectCode >= 0 && subjectCode < subjects.length) {

            const enrolledStudents = [];

            for (let i = 0; i < students.length; i++) {
                const student = students[i];

                if (student.subjects.includes(subjectCode)) {
                    enrolledStudents.push(student);
                }
            }

            if (enrolledStudents.length === 0) {
                console.error("There are no students enrolled in this subject yet!");

            } else {
                console.log(`<- Students enrolled in ${subjectCode} - ${subjects[subjectCode].name}: ->`);
                for (let i = 0; i < enrolledStudents.length; i++) {
                    const student = enrolledStudents[i];
                    console.log(`\nRegistration: ${student.registration} \nName: ${student.name}`);

                    // List the subjects of the students
                    console.log("Subjects:");
                    for (let x = 0; x < student.subjects.length; x++) {
                        const code = student.subjects[x];
                        const subject = subjects[code];
                        console.log("-", subject.name);
                    }
                }
            }
        } else {
            console.error("There are no subjects registered with this code!");
        }
    }
    callMenu();
}


// List Subjects By Teacher
function listSubjectsByTeacher() {
    if (subjects.length === 0) {
        console.error("There are no registered subjects!");

    } else {
        const teacherCode = readlineSync.questionInt("Enter the teacher code to see their subjects: ");
        if (teacherCode >= 0 && teacherCode < teachers.length) {

            const teacherSubjects = [];

            for (let i = 0; i < subjects.length; i++) {
                const subject = subjects[i];

                if (subject.teacher == teacherCode) {
                    teacherSubjects.push(subject);
                }
            }

            if (teacherSubjects.length === 0) {
                console.log(`Prof ${teachers[teacherCode].name} is not yet associated with any subjects.`);

            } else {
                // List the subjects of the teachers
                console.log(`<- Subjects of Prof ${teachers[teacherCode].name}: ->`);
                for (let i = 0; i < teacherSubjects.length; i++) {
                    const subject = teacherSubjects[i];
                    const subjectCode = subjects.indexOf(subject);
                    console.log(`${subjectCode} - ${subject.name}`);
                }
            }
        } else {
            console.error("There are no teachers registered with this code!");
        }
    }
    callMenu();
}


// List Students By Teacher
function listStudentsByTeacher() {
    if (students.length === 0) {
        console.error("There are no registered students!");
    } else {

        const teacherCode = readlineSync.questionInt("Enter the teacher code to see their students: ");

        if (teacherCode >= 0 && teacherCode < teachers.length) {

            const teacherStudents = [];

            for (let i = 0; i < students.length; i++) {
                const student = students[i];

                /* The array method SOME checks if a student is enrolled in subjects of a
                particular teacher and, if so, adds the student to the "teacherStudents" array. */
                if (student.subjects.some((subjectCode) => subjects[subjectCode].teacher == teacherCode)) {
                    teacherStudents.push(student);
                }
            }

            if (teacherStudents.length === 0) {
                console.log(`There are no students enrolled in subjects of Prof ${teachers[teacherCode].name} yet.`);
            } else {
                console.log(`<- Students of Prof ${teachers[teacherCode].name}: ->`);
                for (let i = 0; i < teacherStudents.length; i++) {
                    const student = teacherStudents[i];
                    console.log(`${student.registration} - ${student.name}`);
                }
            }
        } else {
            console.error("There are no teachers registered with this code!");
        }
    }
    callMenu();
}
menu();
