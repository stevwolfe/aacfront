export function getAge(dateString)
    {

        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
            age--;
        }
        return age;
    }

export function formatDate(date) {
  var options = { weekday: 'long', month: 'long', day: 'numeric'};
  return new Date(date).toLocaleDateString("en-US", options)
}

export function formatHours(date) {
  var options = { hour: 'numeric', minute: 'numeric'};
  return new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
