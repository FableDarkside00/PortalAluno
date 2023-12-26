//Variaveis

const in_modal = document.querySelector('.in_modal') 
const modal = document.querySelector('.modal')
const fechar = document.querySelector('.fechar')

//Modal

in_modal.addEventListener("click", (abre_modal)=>{
    abre_modal.preventDefault()
    modal.style.display = "flex"
})


fechar.addEventListener("click", (fecha_modal)=>{
    fecha_modal.preventDefault()
    modal.style.display = "none"
})

window.addEventListener("click", (click_janela)=>{
    if (click_janela.target == modal) {
        modal.style.display = "none"
    }
})