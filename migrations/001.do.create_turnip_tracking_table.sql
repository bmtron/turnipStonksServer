CREATE TABLE turnip_prices (
    id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    island TEXT not null,
    sellbackprice int not null,
    weekday text not null,
    morning bit null,
    evening bit null,
    fulldate date
);