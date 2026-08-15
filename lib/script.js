'use strict';
////////////////////////////////////////////////////////////////////////////////
// Types and helpers

/** An event.
 * @typedef {Object} EventType
 * @property {number} [day]
 * @property {string} [timeStart]
 * @property {string} [timeEnd]
 * @property {string} [title]
 * @property {string} [location]
 * @property {string} [schedule]
 * @property {string} [details]
 */

/** A month of events.
 * @typedef {Object} EventWrapperType
 * @property {number} year
 * @property {number} month
 * @property {Array<EventType>} events
 */

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

////////////////////////////////////////////////////////////////////////////////
// This is the main function, written as an IIFE.
// It loads the event schedule and then displays it.
(async() => {
    try {
        // Get the event schedule.
        /** @type {EventWrapperType} */
        const data = await (await fetch('/api/events.json')).json();

        // Display the schedule's month.
        const monthDisplay =  new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(data.year, data.month - 1));
        globalThis.document.getElementById('overall-date').textContent = `${monthDisplay} ${data.year}`;

        // Construct the events table.
        /** @type {HTMLTableElement} */
        const eventsTable = newElement('table', ['events-table']);
        for(const event of data.events) {
            const row = eventsTable.insertRow();
            const dateCell = row.insertCell();
            const mainCell = row.insertCell();
            const moreCell = row.insertCell();

            dateCell.classList.add('events-table-date');
            mainCell.classList.add('events-table-main');
            moreCell.classList.add('events-table-more');

            const location = newElement('div', ['events-table-location']);
            location.append(
                newElement('span', ['events-table-location-header'], 'Location: '),
                `${event.location || 'TBD'}`
            );

            dateCell.append(
                newElement('div', ['events-table-day'], String(event.day ?? '') || '?'),
                newElement('div', ['events-table-time-start'], event.timeStart  || 'TBD'),
                newElement('div', ['events-table-time-end'],   event.timeEnd    || 'TBD')
            );
            mainCell.append(
                newElement('h2',  ['events-table-title'],    event.title || 'TBD'),
                newElement('div', ['events-table-schedule'], event.schedule ? `${event.schedule}` : '　'),
                location,
            );
            if(event.details) {
                moreCell.classList.add('events-table-more-details');
                moreCell.append(newElement('div', ['events-table-details'], event.details));
            }
        }
        globalThis.document.getElementById('events').append(eventsTable);

        // Construct a plaintext version of the schedule.
        let textSchedule = '';
        textSchedule += `The Barony of Bryn Madoc — ${monthDisplay} ${data.year} Schedule: \n`;
        for(const event of data.events) {
            textSchedule += `• ${data.month}/${event.day || '?'}/${data.year} (${event.timeStart || 'TBD'} – ${event.timeEnd || 'TBD'}): ${event.title || 'TBD'} (${event.location || 'Location TBD'}${event.details ? '. ' + event.details : ''}) \n`;
        }
        textSchedule += '\nAll of these functions are open to everyone! \n(Full calendar available at https://brynmadoc.meridies.org/calendar) ';
        console.log(textSchedule);

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
