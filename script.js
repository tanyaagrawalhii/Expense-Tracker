const errorMessg= document.querySelector(".error_mssg");
const budgetInput= document.querySelector(".budget_input");
const expenseDet = document.querySelector(".expenses_input");
const expenseAmt = document.querySelector(".expenses_amount");
const dateInput = document.getElementById("budget_date");
const tableRec = document.querySelector(".tbl_data");
const cContainer = document.querySelector(".cards");

const budgetCard = document.querySelector(".budget_card");
const expenseCard = document.querySelector(".expenses_card");
const balanceCard = document.querySelector(".balance_card");

let itemList=[];
let itemId=0;

function btnEvents(){
    const btnBudgetCal = document.querySelector("#btn_budget");
    const btnExpensesCal = document.querySelector("#btn_expenses");

    btnBudgetCal.addEventListener("click" ,(e) =>{
        e.preventDefault();
        budgetFun();
    });

    btnExpensesCal.addEventListener("click", (e)=>{
        e.preventDefault();
        expensesFun();
    });
}

document.addEventListener("DOMContentLoaded", btnEvents);

function expensesFun(){
    let expensesDescValue = expenseDet.value;
    let expensesAmountValue = expenseAmt.value;
    let dateValue = dateInput.value;
    if(expensesDescValue =="" || expensesAmountValue =="" || budgetInput <0){
        errorMessg.innerHTML=" <p>Please Enter Expenses Desc or Expense Amount</p>";
        errorMessg.classList.add("error");
        setTimeout(()=>{
            errorMessg.classList.remove("error");
        },2500);
    }
    if(dateValue ==''){
        errorMessg.innerHTML=" <p>Please Enter a Date</p>";
        errorMessg.classList.add("error");
        setTimeout(()=>{
            errorMessg.classList.remove("error");
        },2500);
    }
    else{
        let amount = parseInt(expensesAmountValue);

        expenseAmt.value="";
        expenseDet.value="";
        dateInput.value="";

        let expenses={
            id: itemId,
            title: expensesDescValue,
            amount: amount,
            date:dateValue,
        };
        itemId++;
        itemList.push(expenses);
        addexpenses(expenses);
        showBalance();
    }
}

function addexpenses(ep){
    const html= `<ul class="tbl_content">
                    <li data-id=${ep.id}>${ep.id}</li>
                    <li>${ep.title}</li>
                    <li><span>$</span>${ep.amount}</li>
                    <li>${ep.date}</li>
                    <li>
                        <button type="button" class ="btn_edit">Edit</button>
                        <button type="button" class ="btn_delete">Delete</button>
                    </li>
                </ul>`;
    tableRec.insertAdjacentHTML("beforeend",html);

    const btnEdit = document.querySelectorAll('.btn_edit');
    const btnDel = document.querySelectorAll('.btn_delete');
    const content_id =document.querySelectorAll('.tbl_content');
    
    btnEdit.forEach((btnedit)=>{
        btnedit.addEventListener("click",(el)=>{
            let id;

            content_id.forEach((ids)=>{
                
                 id= ids.firstElementChild.dataset.id;
             });
             let element = el.target.parentElement.parentElement;
             
             element.remove();

             let expenses=itemList.filter(function(item){
                 return item.id ==id;
             });
            

             dateInput.value = expenses[0].date;
             expenseDet.value = expenses[0].title;
             expenseAmt.value=expenses[0].amount;

             let temp_list = itemList.filter(function(item){
                 return item.id != id;
             });
             itemList = temp_list;
         });
     });
     


    btnDel.forEach((btndel)=>{
        btndel.addEventListener("click",(el)=>{
            let id;

            content_id.forEach((ids)=>{
                id= ids.firstElementChild.dataset.id;
            });
            let element = el.target.parentElement.parentElement;
            element.remove();

            let expenses=itemList.filter(function(item){
                return item.id == id;
            });

            let temp_list = itemList.filter(function(item){
                return item.id != id ;
            });
            itemList = temp_list;
            showBalance();
        });
    });

    

}

function budgetFun(){
    const budgetVal = budgetInput.value;
    if(budgetVal== "" || budgetVal <0){
        errorMessg.innerHTML=" <p>Please Enter Budget Amount | More than 0 </p>";
        errorMessg.classList.add("error");
        setTimeout(()=>{
            errorMessg.classList.remove("error");
        },2500);
    }
    else{
        budgetCard.textContent = budgetVal;
        budgetInput.value="";
        showBalance();
    }
}

function showBalance(){
    const expenses = totalExpenses();
    const total = parseInt(budgetCard.textContent) - expenses;
    balanceCard.textContent=total;
    
}

function totalExpenses(){
    let total = 0;
    if(itemList.length > 0){
        total = itemList.reduce(function(acc,curr){
            acc+=curr.amount;
            return acc;
        },0);
    }

    expenseCard.textContent = total;
    return total;
}





