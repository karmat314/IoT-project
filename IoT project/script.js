document.getElementById('settings-button').addEventListener('click', function() {
    var settingsDiv = document.getElementById('settings');
    if (settingsDiv.classList.contains('hidden')) {
      settingsDiv.classList.remove('hidden');
      settingsDiv.style.right = '0';
    } else {
      settingsDiv.style.right = '-300px';
      setTimeout(function() {
        settingsDiv.classList.add('hidden');
      }, 300); // Transition duration
    }
  });

var manualFanCheckbox = document.getElementById('manualFanCheckbox');
var toggleFanCheckbox = document.querySelector('#toggleFan input[type="checkbox"]');
toggleFanCheckbox.disabled = true;
var isOn = false; // Initial state is OFF
// Add event listener to the manual fan checkbox
manualFanCheckbox.addEventListener('change', function() {
  if (this.checked) {
      toggleFanCheckbox.disabled = false;
  } else {
    websocketclient.publish('fan/control', 'OFF', 0, false);
    toggleFanCheckbox.checked = false;
    toggleFanCheckbox.disabled = true; 
  }
});
// Add event listener to the button
toggleFanCheckbox.addEventListener('click', function() {
    // Toggle the state
    isOn = !isOn;
    // Determine the payload based on the state
    var payload = isOn ? 'ON' : 'OFF';
    // Call the publish function with the topic 'fan/control', updated payload, QoS 0, and retain false
    websocketclient.publish('fan/control', payload, 0, false);
});
  