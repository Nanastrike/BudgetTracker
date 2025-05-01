const form = document.getElementById("budget-form");
const categorySelect = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const submitButton = document.getElementById("add-expense");
const expenseList = document.getElementById("expense-list");
const descriptionError = document.getElementById("description-error");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.addEventListener("DOMContentLoaded",function(){
    displayExpenses();
});
form.addEventListener('submit',submitForm);

function submitForm(event){
    //去掉默认刷新
    event.preventDefault();
    const description = descriptionInput.value;
    const amount = amountInput.value;
    const category = categorySelect.value;

    //validation
    descriptionError.textContent = "";
    descriptionError.style.display = "none";

    if(!description || description.trim() ===""){
        descriptionError.textContent = "Please enter the description for the expense";
        descriptionError.style.display = "block";
        return;
    }

    let expense = {
        description:description,
        amount:amount,
        category:category
    };

    expenses.push(expense);
    console.log(expenses);
    form.reset();
    saveLocalStorage();

    displayExpenses();
}

function displayExpenses(){
    expenseList.innerHTML = "";

    expenses.forEach((expense)=>{
        const li = document.createElement("li");
        li.textContent = `${expense.description} - ${expense.amount} - ${expense.category}`;
        //根据category判断类型，然后增加字体底色
        if(expense.category==="Rent"){
            li.classList.add("rent-expense");
        }else if(expense.category==="Entertainment"){
            li.classList.add("entertainment-expense");
        }else{
            li.classList.add("groceries-expense");
        }


        expenseList.appendChild(li);
    })
}

function saveLocalStorage(){
    localStorage.setItem("expenses",JSON.stringify(expenses));
}
