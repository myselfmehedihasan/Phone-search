const loadPhone = async (searchText = '13', isShowAll) => {

     
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container')

    // clear phone container when new thing search on input field
    phoneContainer.textContent = '';


    // 🔴 Show "not found" message if no match
    if (!phones || phones.length === 0) {
        phoneContainer.innerHTML = `
            <h2 class="text-center text-red-500 text-2xl mt-8">No phones found for your search!</h2>
        `;
        // Hide Show All Button and Spinner
        document.getElementById('show-all-container').classList.add('hidden');
        toggleLoadingSpinner(false);
        return;
    }





    // display show all button if there are more than 8 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // display 12 phones if not show all

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 1. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `p-6 space-y-6 text-center border border-[#CFCFCF] rounded-lg mx-auto max-w-72`
        phoneCard.innerHTML = `
                <img src="${phone.image}" alt="" class="mx-auto">
                <h3 class="font-bold text-2xl">${phone.phone_name}</h3>
                <p class=" text-lg max-w-60">There are many variations of passages of available, but the majority have suffered</p>
                <h3 class="font-bold text-2xl">$999</h3>
                <button onclick="showDetailsHandler('${phone.slug}')" class="btn bg-[#0D6EFD] text-white font-semibold text-xl rounded-lg">Show Details</button>
        `
        phoneContainer.appendChild(phoneCard);
    })

    // hide loading spinner
    toggleLoadingSpinner(false);
}


// 
const showDetailsHandler = async (id) => {
    // console.log('showDetailsHandler',id);
    // load single phone data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data);

    const phone = data.data;

    showPhoneDetails(phone);

}



const showPhoneDetails = (phone) => {

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;


    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
            <img src="${phone.image}" alt="" class="mx-auto">
                    <p><span class= "font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
                    <p><span class= "font-bold">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
                    <p><span class= "font-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
                    <p><span class= "font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
                    <p><span class= "font-bold">Slug:</span> ${phone.slug}</p>
                    <p><span class= "font-bold">Release date:</span> ${phone.releaseDate}</p>
                    <p><span class= "font-bold">Brand:</span> ${phone.brand}</p>
                    <p><span class= "font-bold">GPS:</span> ${phone?.others?.GPS || 'No GPS'}</p>
        `

    // show the modal
    show_details_modal.showModal()
}


// search button event handler

const handleSearch = (isShowAll) => {

    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// Handle show all

const showAllHandler = () => {
    handleSearch(true)
}



loadPhone();