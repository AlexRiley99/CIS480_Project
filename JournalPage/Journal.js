//Handle character limit
const textarea = document.getElementById('newEntry');
const charCount = document.getElementById('charCount');
const maxLength = textarea.getAttribute('maxlength');

textarea.addEventListener('input', function(){
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';

    //Update character count
    const textLength = this.value.length;
    charCount.textContent = `${textLength}/500`;

    //Prevent input when max length is reached
    if(this.value.length >= maxLength){
        this.value = this.value.substring(0, maxLength);
    }
});