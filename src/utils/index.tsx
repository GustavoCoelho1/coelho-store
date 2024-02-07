export const UTCtoDate = (utc) => {
    const dateFormat = new Date(Number(utc));

    const date = `${
        (dateFormat.getDate().toString().length < 2 && '0') +
        dateFormat.getDate()
    }/${
        (dateFormat.getMonth().toString().length < 2 && '0') +
        dateFormat.getMonth()
    }/${dateFormat.getFullYear()}`;

    return date;
};
