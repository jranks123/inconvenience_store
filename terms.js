document.addEventListener('DOMContentLoaded', () => {
    const sillyClauses = [
        "Clause 1: You must wear a hat at all times while reading these terms.",
        "Clause 2: All employees must sing 'Happy Birthday' on every Friday at 2 PM.",
        "Clause 3: You are required to dance for 5 minutes after reading these terms."
    ];

    const questions = [
        "What must you wear while reading these terms?",
        "What must employees sing on Fridays?",
        "What must you do for 5 minutes after reading these terms?"
    ];

    const correctAnswers = [
        "a hat",
        "Happy Birthday",
        "dance"
    ];

    const wrongAnswers = [
        ["sunglasses", "a tie"],
        ["Jingle Bells", "Twinkle Twinkle Little Star"],
        ["jump", "sit"]
    ];

    const termsContent = `
        <h2>Introduction</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et eros ac erat mollis scelerisque. Vestibulum convallis convallis erat, nec cursus dui luctus ut. Donec at feugiat urna, a volutpat risus.</p>

        ${sillyClauses[0]}

        <h2>Intellectual Property Rights</h2>
        <p>Fusce egestas pretium velit, nec sodales erat. Nullam a lectus nec risus posuere bibendum ac a enim. Sed laoreet justo velit, sit amet dignissim tortor vehicula id. Suspendisse sit amet consectetur lectus, nec sagittis nunc.</p>
        <p>Mauris gravida, justo id egestas fermentum, ligula justo ultrices orci, at vestibulum leo magna non lorem. Integer vel nulla nec sapien varius vehicula. Integer nec tortor vel neque ultrices dignissim.</p>

        <h2>Acceptable Use</h2>
        <p>Morbi in massa vel nulla dignissim pharetra. Proin ullamcorper urna sed risus interdum, vel facilisis nulla suscipit. Nam sit amet consectetur justo. Sed at facilisis lacus. Suspendisse potenti.</p>
        <p>Nulla facilisi. Curabitur volutpat augue vitae erat vehicula, nec fermentum felis tempus. Donec ullamcorper, libero et vehicula interdum, lorem velit vulputate libero, nec hendrerit augue ex eu felis.</p>

        ${sillyClauses[1]}

        <h2>Restricted Access</h2>
        <p>Crad lacinia risus vitae orci sodales, sit amet consequat lectus dictum. Donec at turpis a metus fringilla blandit. Integer eget convallis magna. Donec cursus augue vel nunc mollis efficitur.</p>
        <p>Suspendisse potenti. Nulla tincidunt nec eros nec cursus. Nullam a est non lectus efficitur fringilla. Nullam ultrices, felis sed cursus porttitor, eros metus congue felis, a condimentum libero lacus non libero.</p>

        <h2>User Content</h2>
        <p>Vivamus consectetur ipsum et lorem faucibus, ac elementum lorem volutpat. Duis rutrum lacinia arcu, ut venenatis ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
        <p>Sed malesuada felis felis, at pharetra arcu facilisis ut. Praesent nec magna tortor. Nam tempor purus non orci posuere, at volutpat nisl tempor. Pellentesque vehicula risus id urna convallis.</p>

        ${sillyClauses[2]}

        <p>Nulla facilisi. Etiam vel lectus purus. Pellentesque ultricies augue ac elit pretium, et vehicula nisi dictum. Nulla facilisi. Aliquam erat volutpat. Praesent nec lacinia urna, ut bibendum magna.</p>
        <p>Nam vehicula magna vel justo dictum, id varius metus ultricies. Fusce elementum ante a risus faucibus, ut scelerisque eros suscipit. Nulla scelerisque lacinia sem, ut gravida arcu vehicula ac.</p>
        <p>Vivamus convallis tempor risus, non vehicula tortor feugiat non. Curabitur sit amet dolor quam. Aliquam erat volutpat. Quisque id interdum felis, eget pharetra sapien. Sed posuere risus nec libero aliquam suscipit.</p>
        <p>Suspendisse venenatis dignissim nisl, a laoreet metus fringilla vel. Proin et quam metus. Nullam quis urna non nulla tempor pharetra. Donec non nulla vitae metus tincidunt tincidunt.</p>
    `;

    const termsContentDiv = document.getElementById('termsContent');
    termsContentDiv.innerHTML = termsContent;

    document.getElementById('acceptTermsButton').addEventListener('click', () => {
        document.getElementById('quizModal').style.display = 'block';

        // Insert quiz questions
        const quizQuestionsDiv = document.getElementById('quizQuestions');
        quizQuestionsDiv.innerHTML = '';
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.innerHTML = `
                <label>${question}</label>
                <select name="question${index}" required>
                    <option value="">Select an answer</option>
                    <option value="${correctAnswers[index]}">${correctAnswers[index]}</option>
                    <option value="${wrongAnswers[index][0]}">${wrongAnswers[index][0]}</option>
                    <option value="${wrongAnswers[index][1]}">${wrongAnswers[index][1]}</option>
                </select>
            `;
            quizQuestionsDiv.appendChild(questionDiv);
        });
    });

    document.getElementById('quizForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const userAnswers = [];
        questions.forEach((_, index) => {
            userAnswers.push(document.querySelector(`select[name="question${index}"]`).value.toLowerCase());
        });

        let correct = true;
        userAnswers.forEach((answer, index) => {
            if (answer.toLowerCase() !== correctAnswers[index].toLowerCase()) {
                correct = false;
            }
        });

        if (correct) {
            window.location.href = 'you-won.html';
        } else {
            document.getElementById('quizModal').style.display = 'none';
            document.getElementById('failModal').style.display = 'block';
        }
    });

    document.getElementById('failContinueButton').addEventListener('click', () => {
        window.location.href = 'index.html'; // Reload to the main site
    });
});
