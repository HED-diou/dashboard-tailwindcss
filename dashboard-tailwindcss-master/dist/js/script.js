// start: Sidebar
const sidebarToggle = document.querySelector('.sidebar-toggle')
const sidebarOverlay = document.querySelector('.sidebar-overlay')
const sidebarMenu = document.querySelector('.sidebar-menu')
const main = document.querySelector('.main')
sidebarToggle.addEventListener('click', function (e) {
    e.preventDefault()
    main.classList.toggle('active')
    sidebarOverlay.classList.toggle('hidden')
    sidebarMenu.classList.toggle('-translate-x-full')
})
sidebarOverlay.addEventListener('click', function (e) {
    e.preventDefault()
    main.classList.add('active')
    sidebarOverlay.classList.add('hidden')
    sidebarMenu.classList.add('-translate-x-full')
})
document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault()
        const parent = item.closest('.group')
        if (parent.classList.contains('selected')) {
            parent.classList.remove('selected')
        } else {
            document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (i) {
                i.closest('.group').classList.remove('selected')
            })
            parent.classList.add('selected')
        }
    })
})
// end: Sidebar



// start: Popper
const popperInstance = {}
document.querySelectorAll('.dropdown').forEach(function (item, index) {
    const popperId = 'popper-' + index
    const toggle = item.querySelector('.dropdown-toggle')
    const menu = item.querySelector('.dropdown-menu')
    menu.dataset.popperId = popperId
    popperInstance[popperId] = Popper.createPopper(toggle, menu, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 24,
                },
            },
        ],
        placement: 'bottom-end'
    });
})
document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.dropdown-toggle')
    const menu = e.target.closest('.dropdown-menu')
    if (toggle) {
        const menuEl = toggle.closest('.dropdown').querySelector('.dropdown-menu')
        const popperId = menuEl.dataset.popperId
        if (menuEl.classList.contains('hidden')) {
            hideDropdown()
            menuEl.classList.remove('hidden')
            showPopper(popperId)
        } else {
            menuEl.classList.add('hidden')
            hidePopper(popperId)
        }
    } else if (!menu) {
        hideDropdown()
    }
})

function hideDropdown() {
    document.querySelectorAll('.dropdown-menu').forEach(function (item) {
        item.classList.add('hidden')
    })
}
function showPopper(popperId) {
    popperInstance[popperId].setOptions(function (options) {
        return {
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
        }
    });
    popperInstance[popperId].update();
}
function hidePopper(popperId) {
    popperInstance[popperId].setOptions(function (options) {
        return {
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }
    });
}
// end: Popper



// start: Tab
document.querySelectorAll('[data-tab]').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault()
        const tab = item.dataset.tab
        const page = item.dataset.tabPage
        const target = document.querySelector('[data-tab-for="' + tab + '"][data-page="' + page + '"]')
        document.querySelectorAll('[data-tab="' + tab + '"]').forEach(function (i) {
            i.classList.remove('active')
        })
        document.querySelectorAll('[data-tab-for="' + tab + '"]').forEach(function (i) {
            i.classList.add('hidden')
        })
        item.classList.add('active')
        target.classList.remove('hidden')
    })
})
// end: Tab





// Récupérez le bouton "Generate" et l'élément parent
const generateButton = document.getElementById('generateButton');
const parentElement = document.getElementById('parentElement');

// Fonction pour afficher le texte lettre par lettre avec un intervalle
function showTextByLetter(text, element) {
    let index = 0;
    const timer = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(timer);
        }
    }, 1); // Intervalle de temps entre chaque lettre (en millisecondes)
}

// Ajoutez un événement "click" au bouton
generateButton.addEventListener('click', () => {
    // Création de la div pour "You"
    const divYou = document.createElement('div');
    divYou.classList.add('overflow-y-auto', 'max-h-48', 'border', 'border-gray-200', 'p-4', 'mb-4', 'rounded-md');
    parentElement.appendChild(divYou);

    // Affichage du texte "You" avec "You" en gras
    divYou.innerHTML = `<div class="text-gray-600 mb-2 text-right"><strong></strong></div>`;
    const messageYou = 'Generate rapport for my task!';
    const strongElement = document.createElement('strong');
    strongElement.textContent = 'You: ';
    divYou.querySelector('.text-gray-600').appendChild(strongElement);
    const messageDivYou = document.createElement('div');
    divYou.querySelector('.text-gray-600').appendChild(messageDivYou);
    showTextByLetter(messageYou, messageDivYou);

// Création de la div pour "REX"
const divRex = document.createElement('div');
divRex.classList.add('overflow-y-auto', 'max-h-48', 'border', 'border-gray-200', 'p-4', 'mb-4', 'rounded-md', 'text-gray-600');
parentElement.appendChild(divRex);

// Affichage du texte "REX" avec le contenu affiché lettre par lettre
divRex.innerHTML = `<strong>REX:</strong><br>`;
const messageRex1 = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ut mollitia accusantium culpa animi modi numquam iure veniam libero! Dignissimos asperiores consectetur corrupti labore quasi, modi recusandae libero velit quod.
    Aspernatur aperiam soluta a qui quidem eligendi quibusdam similique rerum pariatur porro. Illum numquam odio vitae inventore eligendi ex vel ipsam cum reiciendis repellendus, mollitia velit, illo laboriosam fugit laborum?
    Aspernatur aperiam soluta a qui quidem eligendi quibusdam similique rerum pariatur porro. Illum numquam odio vitae inventore eligendi ex vel ipsam cum reiciendis repellendus, mollitia velit, illo laboriosam fugit laborum?
    Aspernatur aperiam soluta a qui quidem eligendi quibusdam similique rerum pariatur porro. Illum numquam odio vitae inventore eligendi ex vel ipsam cum reiciendis repellendus, mollitia velit, illo laboriosam fugit laborum?
`;
const messageDivRex = document.createElement('div');
divRex.appendChild(messageDivRex);
showTextByLetter(messageRex1, messageDivRex);

// Création de la balise canvas
const canvasElement = document.createElement('canvas');
canvasElement.id = 'order-chart';
divRex.appendChild(document.createElement('br')); // Ajoute une ligne pour espacer le canvas du texte précédent
divRex.appendChild(canvasElement);

// Affichage du texte "REX" après le canvas avec le contenu affiché lettre par lettre
const messageRex2 = `
    Aperiam odio sint iste vitae. Error fugit vel explicabo debitis omnis fugiat delectus tempora, labore sed. Magni, ratione possimus asperiores aliquam nobis cum animi aliquid repudiandae totam quisquam! Minus, velit?
    Aspernatur aperiam soluta a qui quidem eligendi quibusdam similique rerum pariatur porro. Illum numquam odio vitae inventore eligendi ex vel ipsam cum reiciendis repellendus, mollitia velit, illo laboriosam fugit laborum?
`;
const messageDivRex2 = document.createElement('div');
divRex.appendChild(messageDivRex2);
showTextByLetter(messageRex2, messageDivRex2);

// Création du bouton "Download as a PDF"
const buttonPDF = document.createElement('button');
buttonPDF.className = 'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none';
buttonPDF.textContent = 'Download as a PDF';
divRex.appendChild(buttonPDF);

// start: Chart
new Chart(document.getElementById('order-chart'), {
    type: 'line',
    data: {
        labels: generateNDays(7),
        datasets: [
            {
                label: 'Active',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgb(59 130 246 / .05)',
                tension: .2
            },
            {
                label: 'Completed',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(16, 185, 129)',
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgb(16 185 129 / .05)',
                tension: .2
            },
            {
                label: 'Canceled',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(244, 63, 94)',
                borderColor: 'rgb(244, 63, 94)',
                backgroundColor: 'rgb(244 63 94 / .05)',
                tension: .2
            },
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function generateNDays(n) {
    const data = []
    for(let i=0; i<n; i++) {
        const date = new Date()
        date.setDate(date.getDate()-i)
        data.push(date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric'
        }))
    }
    return data
}
function generateRandomData(n) {
    const data = []
    for(let i=0; i<n; i++) {
        data.push(Math.round(Math.random() * 10))
    }
    return data
}
// end: Chart
});





































// start: Chart
new Chart(document.getElementById('order-chart'), {
    type: 'line',
    data: {
        labels: generateNDays(7),
        datasets: [
            {
                label: 'Active',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgb(59 130 246 / .05)',
                tension: .2
            },
            {
                label: 'Completed',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(16, 185, 129)',
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgb(16 185 129 / .05)',
                tension: .2
            },
            {
                label: 'Canceled',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(244, 63, 94)',
                borderColor: 'rgb(244, 63, 94)',
                backgroundColor: 'rgb(244 63 94 / .05)',
                tension: .2
            },
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function generateNDays(n) {
    const data = []
    for(let i=0; i<n; i++) {
        const date = new Date()
        date.setDate(date.getDate()-i)
        data.push(date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric'
        }))
    }
    return data
}
function generateRandomData(n) {
    const data = []
    for(let i=0; i<n; i++) {
        data.push(Math.round(Math.random() * 10))
    }
    return data
}
// end: Chart




