document.addEventListener('DOMContentLoaded', function () {
    const sourceFilter = document.getElementById('source-filter');
    const sourceFilterInput = document.getElementById('source-filter-input');
    const typeFilter = document.getElementById('type-filter');
    const publisherFilter = document.getElementById('publisher-filter');
    const publisherFilterInput = document.getElementById('publisher-filter-input');
    const applyFiltersButton = document.getElementById('apply-filters');
    const resetFiltersButton = document.getElementById('reset-filters');
    const searchInput = document.getElementById('searchInput');
    const searchInputOptional = document.getElementById('search-input-optional');
    const searchType = document.getElementById('search-type');
    const cityFilter = document.getElementById('city-filter');
    const cityFilterInput = document.getElementById('city-filter-input');
    const selectedOptions = document.getElementById('fields');
    const selectedOptions2 = document.getElementById('fields2');
    const resultsPerPageSelect = document.getElementById('results-per-page');
    const sortBy = document.getElementById('sort-by');
    const pageInfo = document.getElementById('page-info');
    console.log('Page Info Element:', pageInfo);
    const startDate = document.getElementById('start-date-filter');
    const endDate = document.getElementById('end-date-filter');
    const headerSearchInput = document.getElementById('headerSearchInput');
    const submitButton = document.querySelector('.submit-button-2');


    const typeTranslations = {
        "book": "Llibre",
        "book_section": "Capítol de llibre",
        "generic": "Sense especificar",
        "journal": "Revista",
        "newspaper_article": "Article periodístic",
        "magazine_article": "Altres revistes",
        "web_page": "Pàgina web",
        "pages": "Pàgines",
        "publisher": "Editorial",
        "city": "Ciutat de publicació",
        "television_broadcast": "Document audiovisual",
        "film": "Pel·lícula",
        "thesis": "Tesi doctoral",
        "working_paper": "Document de treball"
    };

    // Función para manejar la búsqueda
    function handleSearch() {
        if (!searchInput || !applyFiltersButton) {
            console.error("searchInput o applyFiltersButton no existen en la página.");
            return;
        }

        searchInput.value = headerSearchInput.value;

        // Comprobar si el valor se ha copiado correctamente
        console.log("Valor de searchInput:", searchInput.value);

        // Simular un clic en el botón de aplicar filtros
        applyFiltersButton.click();
    }

    // Añadir un evento al campo de búsqueda del encabezado
    if (headerSearchInput) {
        headerSearchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {  // Si se presiona Enter
                event.preventDefault();
                handleSearch();
            }
        })
    };

    // Ejecutar la búsqueda cuando se hace clic en el botón "Cerca"
    if (submitButton) {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            handleSearch();
        })
    };


    let filters = {
        query: '',
        optionalQuery: '',
        searchTypeValue: '',
        source: '',
        type: '',
        publisher: '',
        startDate: '',
        endDate: '',
        city: '',
        fields: '',
        fields2: '',
        sortBy: ''
    };

    let currentPage = 1;
    let totalPages = 1;

    // Inicializar los filtros desde la URL
    function initializeFilters() {
        const params = new URLSearchParams(window.location.search);
        filters.query = params.get('query') || '';
        filters.optionalQuery = params.get('optionalQuery') || '';
        filters.searchTypeValue = params.get('searchTypeValue') || '';
        filters.source = params.get('source') || '';
        filters.type = params.get('type') || '';
        filters.publisher = params.get('publisher') || '';
        filters.startDate = params.get('startDate') || '';
        filters.endDate = params.get('endDate') || '';
        filters.city = params.get('city') || '';
        filters.fields = params.get('fields') || '';
        filters.fields2 = params.get('fields2') || '';
        filters.sortBy = params.get('sortBy') || '';
        currentPage = parseInt(params.get('page')) || 1;

        // Asignar los valores a los campos correspondientes
        if (searchInput) searchInput.value = filters.query;
        if (searchInputOptional) searchInputOptional.value = filters.optionalQuery;

        // Aquí ajustamos los valores para los campos select
        if (document.title === "Resultats") {
            const loadInterval = setInterval(() => {
                if (areOptionsLoaded(sourceFilter) && areOptionsLoaded(typeFilter) &&
                    areOptionsLoaded(publisherFilter) && areOptionsLoaded(cityFilter)) {
                    setSelectValue(searchType, filters.searchTypeValue, 'searchType');
                    setSelectValue(sourceFilter, filters.source, 'source');
                    setSelectValue(typeFilter, filters.type, 'type');
                    setSelectValue(publisherFilter, filters.publisher, 'publisher');
                    if (startDate) startDate.value = filters.startDate.split('/').reverse().join('-'); // Formato adecuado
                    if (endDate) endDate.value = filters.endDate.split('/').reverse().join('-'); // Formato adecuado
                    setSelectValue(cityFilter, filters.city, 'city');
                    setSelectValue(selectedOptions, filters.fields, 'fields');
                    setSelectValue(selectedOptions2, filters.fields2, 'fields2');
                    setSelectValue(sortBy, filters.sortBy, 'sortBy');

                    // Mensajes de consola para depuración
                    console.log("searchType:", filters.searchTypeValue, "Selected:", searchType.value);
                    console.log("sourceFilter:", filters.source, "Selected:", sourceFilter.value);
                    console.log("typeFilter:", filters.type, "Selected:", typeFilter.value);
                    console.log("publisherFilter:", filters.publisher, "Selected:", publisherFilter.value);
                    console.log("cityFilter:", filters.city, "Selected:", cityFilter.value);
                    console.log("selectedOptions:", filters.fields, "Selected:", selectedOptions.value);
                    console.log("selectedOptions2:", filters.fields2, "Selected:", selectedOptions2.value);
                    console.log("sortBy:", filters.sortBy, "Selected:", sortBy.value);
                    clearInterval(loadInterval)
                }
            }, 60); // Asegura que se ejecute después de que el DOM se haya actualizado        
        } else {
            setSelectValue(searchType, filters.searchTypeValue, 'searchType');
            setSelectValue(sourceFilter, filters.source, 'source');
            setSelectValue(typeFilter, filters.type, 'type');
            setSelectValue(publisherFilter, filters.publisher, 'publisher');
            if (startDate) startDate.value = filters.startDate.split('/').reverse().join('-'); // Formato adecuado
            if (endDate) endDate.value = filters.endDate.split('/').reverse().join('-'); // Formato adecuado
            setSelectValue(cityFilter, filters.city, 'city');
            setSelectValue(selectedOptions, filters.fields, 'fields');
            setSelectValue(selectedOptions2, filters.fields2, 'fields2');
            setSelectValue(sortBy, filters.sortBy, 'sortBy');

            // Mensajes de consola para depuración
            console.log("searchType:", filters.searchTypeValue, "Selected:", searchType.value);
            console.log("sourceFilter:", filters.source, "Selected:", sourceFilter.value);
            console.log("typeFilter:", filters.type, "Selected:", typeFilter.value);
            console.log("publisherFilter:", filters.publisher, "Selected:", publisherFilter.value);
            console.log("cityFilter:", filters.city, "Selected:", cityFilter.value);
            console.log("selectedOptions:", filters.fields, "Selected:", selectedOptions.value);
            console.log("selectedOptions2:", filters.fields2, "Selected:", selectedOptions2.value);
            console.log("sortBy:", filters.sortBy, "Selected:", sortBy.value);
        }
    }


    function areOptionsLoaded(selectElement) {
        return selectElement && selectElement.options && selectElement.options.length > 0;
    }

    // Función para establecer el valor seleccionado en un campo <select>
    function setSelectValue(selectElement, value, fieldName) {
        if (selectElement && value) {
            // Comprobar si el valor está en las opciones
            const optionFound = Array.from(selectElement.options).some(option => {
                if (option.value === value) {
                    selectElement.value = value;
                    console.log(`Set ${fieldName} to ${value}`);
                    return true;
                }
                return false;
            });

            if (!optionFound) {
                console.warn(`Value ${value} not found in select options for ${fieldName}`, selectElement);
            }
        } else {
            console.warn(`Element or value not provided for ${fieldName}`);
        }
    }

    // Cargar fuentes, tipos, y publishers al iniciar
    if (sourceFilter) fetchSources();
    if (typeFilter) fetchTypes();
    if (cityFilter) fetchCity();
    if (publisherFilter) fetchPublishers();

    // Aplicar filtros
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (searchInput) {
                filters.query = searchInput.value.trim();
            }
            if (searchInputOptional) {
                filters.optionalQuery = searchInputOptional.value.trim();
            }
            if (searchType) {
                filters.searchTypeValue = searchType.value;
            }
            if (sourceFilter) {
                filters.source = sourceFilter.value !== 'Vacío' ? sourceFilter.value : '';
            }
            if (typeFilter) {
                filters.type = typeFilter.value !== 'Vacío' ? typeFilter.value : '';
            }
            if (publisherFilter) {
                filters.publisher = publisherFilter.value !== 'Vacío' ? publisherFilter.value : '';
            }
            if (startDate && startDate.value) {
                filters.startDate = formatDate(startDate.value);
            } else {
                filters.startDate = ''; // O simplemente no agregar a los filtros
            }

            if (endDate && endDate.value) {
                filters.endDate = formatDate(endDate.value);
            } else {
                filters.endDate = ''; // O simplemente no agregar a los filtros
            }
            console.log('Start Date:', filters.startDate);
            console.log('End Date:', filters.endDate);
            if (cityFilter) {
                filters.city = cityFilter.value !== 'Vacío' ? cityFilter.value : '';
            }
            if (selectedOptions) {
                filters.fields = selectedOptions.value;
            }
            if (selectedOptions2) {
                filters.fields2 = selectedOptions2.value;
            }
            if (sortBy) {
                filters.sortBy = sortBy ? sortBy.value : 'default';
            }

            function formatDate(dateStr) {
                const [year, month, day] = dateStr.split('-');
                return `${day}/${month}/${year}`;
            }

            // Crear URL con los filtros y redirigir
            const params = new URLSearchParams(filters);
            for (const key in filters) {
                if (filters[key]) params.append(key, filters[key]);
            }
            window.location.href = `resultats.html?${params.toString()}`;

            currentPage = 1;
        });
    }

    if (resetFiltersButton) {
        resetFiltersButton.addEventListener('click', function () {
            searchInput.value = '';
            searchInputOptional.value = '';
            sourceFilter.value = '';
            sourceFilterInput.value = '';
            typeFilter.value = '';
            publisherFilter.value = '';
            publisherFilterInput.value = '';
            if (startDate && startDate.value) { startDate.value = ''; }
            if (endDate && endDate.value) { endDate.value = ''; }
            cityFilter.value = '';
            cityFilterInput.value = '';
        });
    }

    function fetchResults(page) {
        console.log(`Fetching page ${page} with currentPage ${currentPage} and totalPages ${totalPages}`);

        const resultsPerPage = resultsPerPageSelect ? resultsPerPageSelect.value : '10';

        const params = new URLSearchParams({
            ...filters,
            page,
            limit: resultsPerPage,
        });

        const url = `https://arxiu-python.onrender.com/search?${params.toString()}`;
        console.log('Fetching URL:', url);

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                displayResults(data.results);
                currentPage = data.current_page;
                totalPages = data.total_pages;
                displayTotalResults(data.total_documents);
                updatePaginationControls();
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                displayResults([]);
            });
    }

    function displayTotalResults(totalResults) {
        const resultsInfoContainer = document.querySelector('.text-block-4');
        if (resultsInfoContainer) {
            resultsInfoContainer.textContent = `Resultats: ${totalResults}`;
        }
    }

    async function fetchSources() {
        fetch('https://arxiu-python.onrender.com/get_sources')
            .then(response => response.json())
            .then(data => {
                sourceFilter.innerHTML = '<option value="">Vacío</option>';
                data.forEach(source => {
                    const option = document.createElement('option');
                    option.value = source;
                    option.textContent = source;
                    sourceFilter.appendChild(option);
                });

                sourceFilterInput.addEventListener('input', function () {
                    const filterText = this.value.toLowerCase();
                    Array.from(sourceFilter.options).forEach(option => {
                        const text = option.textContent.toLowerCase();
                        option.style.display = text.includes(filterText) ? '' : 'none';
                    });
                });
            })
            .catch(error => console.error('Error fetching sources:', error));
    }

    async function fetchTypes() {
        fetch('https://arxiu-python.onrender.com/get_types')
            .then(response => response.json())
            .then(data => {
                typeFilter.innerHTML = '<option value="">Vacío</option>';
                data.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type;
                    option.textContent = typeTranslations[type] || type;
                    typeFilter.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching types:', error));
    }

    async function fetchPublishers() {
        fetch('https://arxiu-python.onrender.com/get_publishers')
            .then(response => response.json())
            .then(data => {
                publisherFilter.innerHTML = '<option value="">Vacío</option>';
                data.forEach(publisher => {
                    const option = document.createElement('option');
                    option.value = publisher;
                    option.textContent = publisher;
                    publisherFilter.appendChild(option);
                });

                publisherFilterInput.addEventListener('input', function () {
                    const filterText = this.value.toLowerCase();
                    Array.from(publisherFilter.options).forEach(option => {
                        const text = option.textContent.toLowerCase();
                        option.style.display = text.includes(filterText) ? '' : 'none';
                    });
                });
            })
            .catch(error => console.error('Error fetching publishers:', error));
    }

    async function fetchCity() {
        fetch('https://arxiu-python.onrender.com/get_city')
            .then(response => response.json())
            .then(data => {
                cityFilter.innerHTML = '<option value="">Vacío</option>';
                data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    cityFilter.appendChild(option);
                });

                cityFilterInput.addEventListener('input', function () {
                    const filterText = this.value.toLowerCase();
                    Array.from(cityFilter.options).forEach(option => {
                        const text = option.textContent.toLowerCase();
                        option.style.display = text.includes(filterText) ? '' : 'none';
                    });
                });
            })
            .catch(error => console.error('Error fetching cities:', error));
    }

    function displayResults(results) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        if (sortBy === 'date-asc') {
            results.sort((a, b) => {
                // Comparar fechas, colocando los que no tienen fecha al final
                const dateA = a.date ? new Date(a.date) : Infinity; // Si no hay fecha, asignar Infinity
                const dateB = b.date ? new Date(b.date) : Infinity; // Lo mismo para b
                // Agrega un console.log para verificar los valores
                console.log(`Comparando: a.date = ${a.date}, dateA = ${dateA}, b.date = ${b.date}, dateB = ${dateB}`);

                return dateA - dateB; // Ordenar de forma ascendente
            });
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>Sense resultats.</p>';
        } else {
            results.forEach(result => {
                const div = document.createElement('div');
                div.className = 'result-item';

                let formattedDate = '';
                if (result.date) {
                    formattedDate = result.date;
                }

                const typeTranslation = typeTranslations[result.type] || result.type;

                let resultContent = `
                    <p><strong>Títol:</strong> ${result.title || ''}</p>
                `;

                function getNames(list) {
                    if (!list || !Array.isArray(list)) {
                        return '';
                    }
                    return list.map(item => {
                        return item.name || '';
                    }).join(', ');
                }

                function createDynamicLabel(list, singular, plural) {
                    if (!list || list.length === 0) return '';
                    const label = list.length > 1 ? plural : singular;
                    return `<p><strong>${label}:</strong> ${getNames(list)}</p>`;
                }

                resultContent += createDynamicLabel(result.authors, 'Autor', 'Autors');
                resultContent += createDynamicLabel(result.editor, 'Editor', 'Editors');
                resultContent += createDynamicLabel(result.translator, 'Traductor', 'Traductors');
                resultContent += createDynamicLabel(result.director, 'Director', 'Directors');
                resultContent += createDynamicLabel(result.coordinator, 'Coordinador', 'Coordinadors');
                resultContent += createDynamicLabel(result.illustrator, 'Il·lustrador', 'Il·lustradors');

                if (result.source) {
                    resultContent += `<p><strong>Font:</strong> ${result.source}</p>`;
                }
                resultContent += `<p><strong>Tipus de publicació:</strong> ${typeTranslation}</p>`;

                if (result.book) {
                    resultContent += `<p><strong>Llibre:</strong> ${result.book}</p>`;
                }
                if (result.date) {
                    resultContent += `<p><strong>Data:</strong> ${result.date}</p>`;
                }
                if (result.pages) {
                    resultContent += `<p><strong>Pàgines:</strong> ${result.pages}</p>`;
                }
                if (result.publisher) {
                    resultContent += `<p><strong>Editorial:</strong> ${result.publisher}</p>`;
                }
                if (result.city) {
                    resultContent += `<p><strong>Ciutat de publicació:</strong> ${result.city}</p>`;
                }

                resultContent += `
                    <button class="export-button buttonclass w-button" data-result='${JSON.stringify(result).replace(/'/g, "&apos;")}'>Exportar a BibTeX</button>
                    <hr class="solid">
                `;
                div.innerHTML = resultContent;
                resultsContainer.appendChild(div);
            });

            const exportButtons = document.querySelectorAll('.export-button');
            exportButtons.forEach(button => {
                button.addEventListener('click', function () {
                    try {
                        const result = JSON.parse(this.getAttribute('data-result').replace(/&apos;/g, "'"));
                        exportToBibTeX(result);
                    } catch (error) {
                        console.error('Error parsing result JSON:', error);
                    }
                });
            });
        }
    }

    function exportToBibTeX(result) {
        // Definir mapeo de tipos personalizados a tipos estándar
        const typeMapping = {
            'newspaper_article': 'article',
            'journal': 'article',
            'magazine_article': 'article',
            'book': 'book',
            'book_section': 'inbook'
        };

        // Verificar el valor recibido para el tipo
        const resultType = result.type || 'Sense especificar'; // Valor por defecto si no se especifica
        const type = typeMapping[resultType] || 'misc'; // Mapear a tipo estándar, usar 'misc' si no se encuentra



        const id = result.id || 'unknown';
        const title = result.title || '';
        const authors = result.authors ? result.authors.map(a => a.name).join(' and ') : '';
        const editor = result.editor ? result.editor.map(e => e.name).join(' and ') : '';
        const translator = result.translator ? result.translator.map(t => t.name).join(' and ') : '';
        const director = result.director ? result.director.map(d => d.name).join(' and ') : '';
        const coordinator = result.coordinator ? result.coordinator.map(c => c.name).join(' and ') : '';
        const illustrator = result.illustrator ? result.illustrator.map(i => i.name).join(' and ') : '';
        const source = result.source || '';
        const book = result.book || '';
        const date = result.date || '';
        const pages = result.pages || '';
        const publisher = result.publisher || '';
        const city = result.city || '';

        // Construir el contenido de BibTeX solo con campos no vacíos
        let bibtex = `@${type}{${id}`;

        if (title) bibtex += `,\n  title = {${title}}`;
        if (authors) bibtex += `,\n  author = {${authors}}`;
        if (editor) bibtex += `,\n  editor = {${editor}}`;
        if (translator) bibtex += `,\n  translator = {${translator}}`;
        if (director) bibtex += `,\n  director = {${director}}`;
        if (coordinator) bibtex += `,\n  coordinator = {${coordinator}}`;
        if (illustrator) bibtex += `,\n  illustrator = {${illustrator}}`;
        if (source) bibtex += `,\n  source = {${source}}`;
        if (book) bibtex += `,\n  book = {${book}}`;
        if (date) bibtex += `,\n  date = {${date}}`;
        if (pages) bibtex += `,\n  pages = {${pages}}`;
        if (publisher) bibtex += `,\n  publisher = {${publisher}}`;
        if (city) bibtex += `,\n  city = {${city}}`;

        bibtex += `\n}`;

        // Crear un blob de tipo texto con el contenido de BibTeX
        const blob = new Blob([bibtex], { type: 'text/plain' });

        // Crear un URL del blob
        const url = URL.createObjectURL(blob);

        // Crear un enlace para la descarga del archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title || 'unknown'}.bib`;

        // Añadir el enlace al DOM y simular un clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Remover el enlace del DOM
        document.body.removeChild(a);

        // Liberar el URL del blob
        URL.revokeObjectURL(url);
    }


    if (resultsPerPageSelect) {
        resultsPerPageSelect.addEventListener('change', function () {
            currentPage = 1;  // Reset to the first page whenever the results per page changes
            applyFilters(currentPage);
        });
    }

    function updatePaginationControls() {
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

        const paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = ''; // Limpiar los controles de paginación existentes

        if (totalPages <= 1) return; // No mostrar la paginación si solo hay una página

        // Botón para la primera página
        if (totalPages > 1) {
            const firstPageButton = createPaginationButton(1);
            paginationContainer.appendChild(firstPageButton);
        }

        // Calcular el rango de páginas a mostrar
        const minPagesToShow = 5; // Número mínimo de botones de página a mostrar
        let startPage = Math.max(currentPage - Math.floor(minPagesToShow / 2), 2);
        let endPage = Math.min(startPage + minPagesToShow - 1, totalPages - 1);

        // Ajustar el rango si es necesario para mostrar al menos 5 páginas
        if (endPage - startPage < minPagesToShow - 1) {
            startPage = Math.max(endPage - minPagesToShow + 1, 2);
        }

        // Botones para las páginas intermedias
        for (let page = startPage; page <= endPage; page++) {
            const pageButton = createPaginationButton(page);
            paginationContainer.appendChild(pageButton);
        }

        // Botón para la última página
        if (totalPages > 1) {
            const lastPageButton = createPaginationButton(totalPages);
            paginationContainer.appendChild(lastPageButton);
        }

        // Establecer el botón de la página actual como activo
        setActivePageButton();
    }

    function createPaginationButton(page) {
        const button = document.createElement('button');
        button.classList.add('pagination-button', 'button-16', 'buttonclass', 'w-button');
        button.textContent = page; // Mostrar el número de la página

        if (page === currentPage) {
            button.classList.add('active-page'); // Añadir clase especial al botón de la página actual
        }

        button.disabled = (page === currentPage); // Deshabilitar el botón si es la página actual

        button.addEventListener('click', () => {
            if (page !== currentPage) {
                fetchResults(page); // Cargar los resultados de la página seleccionada
            }
        });

        return button;
    }

    function setActivePageButton() {
        const buttons = document.querySelectorAll('#pagination-container .pagination-button');
        buttons.forEach(button => {
            if (parseInt(button.textContent, 10) === currentPage) {
                button.classList.add('active-page'); // Añadir clase especial al botón de la página actual
            } else {
                button.classList.remove('active-page');
            }
        });
    }

    // Aplicar filtros y actualizar resultados
    function applyFilters(page = currentPage) {
        fetchResults(
            searchInput ? searchInput.value.trim() : '',
            searchInputOptional ? searchInputOptional.value.trim() : '',
            searchType ? searchType.value : '',
            sourceFilter ? sourceFilter.value : '',
            typeFilter ? typeFilter.value : '',
            publisherFilter ? publisherFilter.value : '',
            startDate ? startDate.value : '',
            endDate ? endDate.value : '',
            cityFilter ? cityFilter.value : '',
            selectedOptions ? selectedOptions.value : '',
            selectedOptions2 ? selectedOptions2.value : '',
            page
        );
    }

    initializeFilters();
    fetchResults(currentPage);
});
