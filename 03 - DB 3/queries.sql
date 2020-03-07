-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.productname, c.categoryname
FROM product as p
JOIN  category as c
 ON p.categoryid = c.id
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.id as orderId, s.companyname as shipperCompany
FROM [order] as o
JOIN  shipper as s
 ON o.shipvia = s.id
WHERE o.orderdate < '2012-08-09'
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT p.productname, od.orderid
FROM product as p
JOIN orderdetail as od
    ON p.id = od.productid
WHERE od.orderid = 10251
ORDER BY p.productname
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.id as orderId, c.companyname as customerCompany, e.lastname as employeeLastName
FROM [order] as o
JOIN customer as c 
    ON c.id = o.CustomerId 
JOIN employee as e
    ON e.id = o.employeeid