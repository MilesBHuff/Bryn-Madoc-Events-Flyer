'use strict';

/** Creates an HTML element.
 * @param {string} tag The type of element to create.
 * @param {Array<string>} classList The CSS classes to apply to the element.
 * @param {string} text The text to place inside the element.
 * @returns the element.
 */
const newElement = (tag, classList, text) => {
    const element = globalThis.document.createElement(tag);
    if(classList) element.classList.add(...classList);
    if(text) element.textContent = text;
    return element;
};

// This is the main function, written as an IIFE.
// It loads the event schedule and then displays it.
(async() => {
    try {
        // Get the event schedule.
        const data = await (await fetch('./api/events.json')).json();

        // Display the schedule's month.
        const monthDisplay =  new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(data.year, data.month - 1));
        globalThis.document.getElementById('overall-date').textContent = `${monthDisplay} ${data.year}`;

        // Construct the events table.
        const eventsTable = newElement('table', ['events-table']);
        for(const event of data.events) {
            const row = eventsTable.insertRow();
            const dateCell = row.insertCell();
            const mainCell = row.insertCell();
            const moreCell = row.insertCell();

            row.classList.add('events-table-row');
            dateCell.classList.add('events-table-cell', 'events-table-cell-date');
            mainCell.classList.add('events-table-cell', 'events-table-cell-main');
            moreCell.classList.add('events-table-cell', 'events-table-cell-more');

            const location = newElement('div', ['events-table-cell-location']);
            location.append(
                newElement('span', ['events-table-cell-location-header'], 'Location: '),
                `${event.location || 'TBD'}`
            );

            dateCell.append(
                newElement('div', ['events-table-cell-day'],        event.day       || 'TBD'),
                newElement('div', ['events-table-cell-time-start'], event.timeStart || 'TBD'),
                newElement('div', ['events-table-cell-time-end'],   event.timeEnd   || 'TBD')
            );
            mainCell.append(
                newElement('div', ['events-table-cell-title'], event.title || 'TBD'),
                location,
                newElement('div', ['events-table-cell-schedule'], event.schedule ? `${event.schedule}` : '　'),
            );
            if(event.details) {
                moreCell.classList.add('events-table-cell-more-details');
                moreCell.append(newElement('div', ['events-table-cell-details'], event.details));
            }
        }
        globalThis.document.getElementById('events').append(eventsTable);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    } catch(error) {
        console.error(error);
        const messageElement = globalThis.document.getElementById('loading-error');
        if(messageElement) messageElement.style.display = 'block';
        else console.error(new ReferenceError("Can't find error-message element!"));
    } finally {
        const spinnerElement = globalThis.document.getElementById('loading-spinner');
        if(spinnerElement) spinnerElement.style.display = 'none';
        else console.error(new ReferenceError("Can't find spinner element!"));
    }
})();
