'use strict';
(async() => {
    try {
        const data = await (await fetch('./api/events.json')).json();

        const monthDisplay =  new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(data.year, data.month - 1));
        globalThis.document.getElementById('overall-date').textContent = `${monthDisplay} ${data.year}`;

        const eventsTable = globalThis.document.createElement('table');
        eventsTable.classList.add('events-table');
        for(const event of data.events) {
            const row = eventsTable.insertRow();
            const dateCell = row.insertCell();
            const mainCell = row.insertCell();
            const moreCell = row.insertCell();

            row.classList.add('events-table-row');
            dateCell.classList.add('events-table-cell', 'events-table-cell-date');
            mainCell.classList.add('events-table-cell', 'events-table-cell-main');
            moreCell.classList.add('events-table-cell', 'events-table-cell-more');
            if(event.details) moreCell.classList.add('events-table-cell', 'events-table-cell-more-details');

            dateCell.innerHTML = `
<div class="events-table-cell-day">${event.day || 'TBD'}</div>
<div class="events-table-cell-time-start">${event.timeStart || 'TBD'}</div>
<div class="events-table-cell-time-end">${event.timeEnd || 'TBD'}</div>
`;
            mainCell.innerHTML = `
<div class="events-table-cell-title">${event.title || 'TBD'}</div>
<div class="events-table-cell-location">
    <span class="events-table-cell-location-header">Location:</span>
    ${event.location || 'TBD'}
</div>
<div class="events-table-cell-schedule">${event.schedule}</div>
`;
            if(event.details) moreCell.innerHTML = `
<div class="events-table-cell-details">${event.details}</div>
`;
        }
        globalThis.document.getElementById('events').appendChild(eventsTable);

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
