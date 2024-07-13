const leitor = require("readline-sync")

const professores = []
const disciplinas = []
const alunos = []

function menu() {
    console.log(`Welcome to the academic management system!`)
    console.log("1 - Cadastrar professores")
    console.log("2 - Cadastrar disciplinas")
    console.log("3 - Cadastrar alunos")
    console.log("4 - Listar disciplinas")
    console.log("5 - Listar professores")
    console.log("6 - Listar alunos")
    console.log("7 - Listar alunos por disciplina")
    console.log("8 - Listar disciplinas por professores")
    console.log("9 - Listar alunos por disciplinas")
    console.log("0 - Sair")
    console.log()

    let opcao = leitor.questionInt(chalk.green("Choose an option: "))

    switch (opcao) {
        case 1:
            cadastrarProfessor()
            break

        case 2:
            cadastrarDisciplina()
            break

        case 3:
            cadastrarAlunos()
            break

        case 4:
            listarDisciplinas()
            break

        case 5:
            listarProfessores()
            break

        case 6:
            listarAlunos()
            break

        case 7:
            listarAlunosPorDisciplina()
            break

        case 8:
            listarDisciplinasPorProfessor()
            break

        case 9:
            listarAlunosPorProfessor()
            break

        case 0:
            console.log("Saindo...")
            break

        default:
            console.error("Opcao invalida!")
            setTimeout(() => {
                console.clear();
                menu();
            }, 2000);
    }
}

// Função para voltar para o menu em determinado tempo
function chamarMenu() {
    setTimeout(() => {
        console.clear();
        menu();
    }, 2000);
}


//Cadastrar Professor
function cadastrarProfessor() {
    let nomeProf = leitor.question("Digite o nome do professor: ")
    let existe = false

    for (let i = 0; i < professores.length; i++) {
        if (professores[i].nome == nomeProf) {
            existe = true
            break
        }
    }

    if (existe) {
        console.log("Este professor ja esta cadastrado!")
    } else {
        let professor = {
            nome: nomeProf
        }

        professores.push(professor)

        console.log("Professor cadastrado com sucesso!")
    }
    chamarMenu();
}


// Cadastrar disciplina
function cadastrarDisciplina() {
    // Verificar se existe professores
    if (professores.length == 0) {
        console.error("Nao ha professores cadastrados!")

    } else {
        let nomeDisciplina = leitor.question("Digite o nome da disciplina: ")

        // Verificar se a disciplina já existe
        let existe = false

        for (let i = 0; i < disciplinas.length; i++) {
            if (disciplinas[i].nome == nomeDisciplina) {
                existe = true
                break
            }
        }

        if (existe) {
            console.error("Esta disciplina ja esta cadastrada!")

        } else {
            let codProfessor = leitor.question("Digite o codigo do professor: ")

            // Verifica se existe professor com esse índice
            if (professores[codProfessor] == undefined) {
                console.error("Nao ha professor cadastrado com o codigo informado.")

            } else {
                let disciplina = {
                    nome: nomeDisciplina,
                    professor: codProfessor
                }

                disciplinas.push(disciplina)
                console.log("Disciplina cadastrada com sucesso!")
            }
        }
    }
    chamarMenu();
}


// Cadastrar Alunos
function cadastrarAlunos() {
    // Verificar se existe disciplinas
    if (disciplinas.length == 0) {
        console.error("Nao ha disciplinas cadastradas!")

    } else {
        let nomeAluno = leitor.question("Digite o nome do aluno: ")

        // Verificar se a o aluno já está cadastrado
        let existeAluno = false

        for (let i = 0; i < alunos.length; i++) {
            if (alunos[i].nome == nomeAluno) {
                existeAluno = true
                break
            }
        }

        if (existeAluno) {
            console.log("Este aluno ja esta cadastrado!")

            //Perguntar quantas disciplinas o aluno irá cursar
        } else {
            let qtdDisciplinas = leitor.questionInt(`Quantas disciplinas ${nomeAluno} ira cursar? `)

            if (qtdDisciplinas <= 0 || qtdDisciplinas > disciplinas.length) {
                console.error("Quantidade de disciplinas invalida!")

            } else {
                let listaDisciplinas = []
                for (let i = 0; i < qtdDisciplinas; i++) {
                    let numDisciplina = leitor.questionInt("Digite o codigo da disciplina: ")

                    //Preencher o array com os codigos
                    listaDisciplinas.push(numDisciplina)

                    // Verificar se existe disciplina com esse índice
                    if (disciplinas[numDisciplina] == undefined) {
                        console.error("Nao ha disciplina cadastrada com o codigo informado.")
                    }
                }

                //Gerar número aleatório de matrícula
                codMatricula = Math.floor(Math.random() * (10000 - 0 + 0)) + 0

                let aluno = {
                    nome: nomeAluno,
                    disciplinas: listaDisciplinas,
                    matricula: codMatricula
                }
                alunos.push(aluno)
                console.log("Aluno cadastrado com sucesso!")
            }
        }
    }
    chamarMenu();
}


//Listar Disciplinas
function listarDisciplinas() {
    if (disciplinas.length == 0) {
        console.error("Nao ha disciplinas cadastradas!")

    } else {
        console.log("\n")
        console.log("Disciplinas cadastradas:")

        for (let i = 0; i < disciplinas.length; i++) {
            console.log(`${i} - ${disciplinas[i].nome} - Prof ${professores[disciplinas[i].professor].nome}`)
        }
    }
    chamarMenu();
}


//Listar Professores
function listarProfessores() {
    if (professores.length == 0) {
        console.error("Nao ha professores cadastrados!")
    } else {
        console.log("\n")
        console.log("Professores cadastrados:")

        for (let i = 0; i < professores.length; i++) {
            console.log(`\nCodigo: ${i} \nNome: ${professores[i].nome}`)

            // Listar as disciplinas dos professores
            console.log("Disciplinas:")
            for (let j = 0; j < disciplinas.length; j++) {
                if (disciplinas[j].professor == i) {
                    console.log(`- ${disciplinas[j].nome}`)
                }
            }
        }
    }
    chamarMenu();
}


//Listar Alunos
function listarAlunos() {
    if (alunos.length === 0) {
        console.error("Nao ha alunos cadastrados!")

    } else {
        console.log("Alunos cadastrados:")

        for (let i = 0; i < alunos.length; i++) {
            const aluno = alunos[i]
            console.log(`\nMatricula: ${aluno.matricula} \nNome: ${aluno.nome}`)

            // Listar as disciplinas dos alunos
            console.log("Disciplinas:")
            for (let x = 0; x < aluno.disciplinas.length; x++) {
                const cod = aluno.disciplinas[x]
                const disciplina = disciplinas[cod]
                console.log("-", disciplina.nome)
            }
        }
    }
    chamarMenu();
}


//Listar Alunos Por Disciplina
function listarAlunosPorDisciplina() {
    if (alunos.length === 0) {
        console.error("Nao ha alunos cadastrados!")

    } else {
        const codDisciplina = leitor.questionInt("Digite o codigo da disciplina para ver seus alunos: ")
        if (codDisciplina >= 0 && codDisciplina < disciplinas.length) {

            const alunosMatriculados = []

            for (let i = 0; i < alunos.length; i++) {
                const aluno = alunos[i]

                if (aluno.disciplinas.includes(codDisciplina)) {
                    alunosMatriculados.push(aluno)
                }
            }

            if (alunosMatriculados.length === 0) {
                console.error("Ainda nao ha alunos matriculados nesta disciplina!")

            } else {
                console.log(`\nAlunos matriculados em ${codDisciplina} - ${disciplinas[codDisciplina].nome}:`)
                for (let i = 0; i < alunosMatriculados.length; i++) {
                    const aluno = alunosMatriculados[i]
                    console.log(`\nMatricula: ${aluno.matricula} \nNome: ${aluno.nome}`)

                    // Listar as disciplinas dos alunos 
                    console.log("Disciplinas:")
                    for (let x = 0; x < aluno.disciplinas.length; x++) {
                        const cod = aluno.disciplinas[x]
                        const disciplina = disciplinas[cod]
                        console.log("-", disciplina.nome)
                    }
                }
            }
        } else {
            console.error("Nao ha disciplinas cadastradas com este codigo!")
        }
    }
    chamarMenu();
}


//Listar Disciplinas Por Professor
function listarDisciplinasPorProfessor() {
    if (disciplinas.length === 0) {
        console.error("Nao ha disciplinas cadastradas!")

    } else {
        const codProfessor = leitor.questionInt("Digite o codigo do professor para ver suas disciplinas: ")
        if (codProfessor >= 0 && codProfessor < professores.length) {

            const disciplinasDoProf = []

            for (let i = 0; i < disciplinas.length; i++) {
                const disciplina = disciplinas[i]

                if (disciplina.professor == codProfessor) {
                    disciplinasDoProf.push(disciplina)
                }
            }

            if (disciplinasDoProf.length === 0) {
                console.log(`Prof ${professores[codProfessor].nome} ainda nao esta associado(a) a nenhuma disciplina.`)

            } else {
                // Listar as disciplinas dos professores
                console.log(`\nDisciplinas de prof ${professores[codProfessor].nome}:`)
                for (let i = 0; i < disciplinasDoProf.length; i++) {
                    const disciplina = disciplinasDoProf[i]
                    const codDisciplina = disciplinas.indexOf(disciplina)
                    console.log(`${codDisciplina} - ${disciplina.nome}`)
                }
            }
        } else {
            console.error("Nao ha professores cadastrados com este codigo!")
        }
    }
    chamarMenu();
}


//Listar Alunos Por Professor
function listarAlunosPorProfessor() {
    if (alunos.length === 0) {
        console.error("Nao ha alunos cadastrados!")
    } else {

        const codProf = leitor.questionInt("Digite o codigo do professor para ver seus alunos: ")

        if (codProf >= 0 && codProf < professores.length) {

            const alunosDoProfessor = []

            for (let i = 0; i < alunos.length; i++) {
                const aluno = alunos[i]

                /*O método de array SOME verifica se um aluno está matriculado em disciplinas de um
                determinado professor e, caso esteja, adiciona o aluno ao array "alunosDoProfessor".*/
                if (aluno.disciplinas.some((codDisciplina) => disciplinas[codDisciplina].professor == codProf)) {
                    alunosDoProfessor.push(aluno)
                }
            }

            if (alunosDoProfessor.length === 0) {
                console.log(`Ainda não ha alunos matriculados em disciplinas de Prof ${professores[codProf].nome}.`)
            } else {
                console.log(`\nAlunos de Prof ${professores[codProf].nome}: `)
                for (let i = 0; i < alunosDoProfessor.length; i++) {
                    const aluno = alunosDoProfessor[i]
                    console.log(`${aluno.matricula} - ${aluno.nome}`)
                }
            }
        } else {
            console.error("Nao ha professores cadastrados com este codigo!")
        }
    }
    chamarMenu();
}
menu();