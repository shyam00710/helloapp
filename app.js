document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        window.web3 = new Web3(window.ethereum);

        // Request account access if needed
        await ethereum.request({ method: 'eth_requestAccounts' });

        // Contract ABI and Address (replace with your own ABI and address)
        const abi = [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_profession",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_skills",
                        "type": "string[]"
                    }
                ],
                "name": "createProfile",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_profession",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_skills",
                        "type": "string[]"
                    }
                ],
                "name": "updateProfile",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_description",
                        "type": "string"
                    }
                ],
                "name": "postJob",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_jobId",
                        "type": "uint256"
                    }
                ],
                "name": "applyForJob",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];

        const contractAddress = '0xYourContractAddress';
        const contract = new web3.eth.Contract(abi, contractAddress);

        const interactionForm = document.getElementById('interactionForm');
        const formTitle = document.getElementById('form-title');
        const submitButton = document.getElementById('submitButton');
        const profileFields = document.getElementById('profile-fields');
        const jobFields = document.getElementById('job-fields');

        document.getElementById('create-profile-link').addEventListener('click', () => {
            formTitle.textContent = 'Create Profile';
            submitButton.textContent = 'Create Profile';
            profileFields.style.display = 'block';
            jobFields.style.display = 'none';
            interactionForm.setAttribute('data-action', 'create-profile');
        });

        document.getElementById('update-profile-link').addEventListener('click', () => {
            formTitle.textContent = 'Update Profile';
            submitButton.textContent = 'Update Profile';
            profileFields.style.display = 'block';
            jobFields.style.display = 'none';
            interactionForm.setAttribute('data-action', 'update-profile');
        });

        document.getElementById('post-job-link').addEventListener('click', () => {
            formTitle.textContent = 'Post Job';
            submitButton.textContent = 'Post Job';
            profileFields.style.display = 'none';
            jobFields.style.display = 'block';
            interactionForm.setAttribute('data-action', 'post-job');
        });

        document.getElementById('apply-job-link').addEventListener('click', () => {
            formTitle.textContent = 'Apply for Job';
            submitButton.textContent = 'Apply for Job';
            profileFields.style.display = 'none';
            jobFields.style.display = 'block';
            interactionForm.setAttribute('data-action', 'apply-job');
        });

        interactionForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const action = interactionForm.getAttribute('data-action');
            const accounts = await web3.eth.getAccounts();

            try {
                if (action === 'create-profile') {
                    const name = document.getElementById('name').value;
                    const profession = document.getElementById('profession').value;
                    const skills = document.getElementById('skills').value.split(',');
                    await contract.methods.createProfile(name, profession, skills).send({ from: accounts[0] });
                    alert('Profile created successfully');
                } else if (action === 'update-profile') {
                    const name = document.getElementById('name').value;
                    const profession = document.getElementById('profession').value;
                    const skills = document.getElementById('skills').value.split(',');
                    await contract.methods.updateProfile(name, profession, skills).send({ from: accounts[0] });
                    alert('Profile updated successfully');
                } else if (action === 'post-job') {
                    const title = document.getElementById('title').value;
                    const description = document.getElementById('description').value;
                    await contract.methods.postJob(title, description).send({ from: accounts[0] });
                    alert('Job posted successfully');
                } else if (action === 'apply-job') {
                    const jobId = document.getElementById('jobId').value;
                    await contract.methods.applyForJob(jobId).send({ from: accounts[0] });
                    alert('Applied for job successfully');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Transaction failed.');
            }
        });
    } else {
        alert('MetaMask is not installed. Please install MetaMask and refresh the page.');
    }
});
