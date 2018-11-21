"use strict";
exports.__esModule = true;
exports.config = {
    csv: [
        {
            name: 'name',
            minLength: 2,
            maxLength: 15,
            regExp: '[a-zA-Z]'
        },
        {
            name: 'surname',
            minLength: 2,
            maxLength: 15,
            regExp: '[a-zA-Z]'
        },
        {
            name: 'age',
            minLength: 2,
            maxLength: 2,
            regExp: '[0-9]'
        },
        {
            name: 'date',
            minLength: 8,
            maxLength: 8,
            minMonth: 1,
            maxMonth: 12,
            minDay: 1,
            maxDay: 31
        },
        {
            name: 'time',
            minLength: 4,
            maxLength: 7,
            minHour: 0,
            maxHour: 23,
            minMinute: 0,
            maxMinute: 59,
            regExp: '/(^(\d{1,2}):(\d{2})\s?(?:am|pm)?)$|^\d{1}(?:am|pm)$/i'
        },
        {
            name: 'email'
        },
        {
            name: 'phone',
            regExp: '\\+375 (29|25|44|33) \\d{7}'
        },
    ]
};
