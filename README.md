# INFO

### AWS Read-Only Credentials

To view/download images read-only access required.

Template available under https://bitbucket.org/Amir_VoidBox/open-strategy-network/downloads

AWS-S3-read-only-credentials.csv

This user should be already set up in AWS.

Put them in settings.json under "public.aws".

WARNING: this credentials are visible on client-side, i.e. when in production access must be read-only.

# ISSUES

### FIXED: In /members only current user is shown
all members should be visible.

### OPEN: In /members profile picture is not visible.

Commit c64b308 working.

Commit 5d45540 not working.

Error introduced between commits.

People involved: Rogerio Sanchez, Sandra Altmeyer, Amir Rahbaran

### FIXED: Adding Category/Tags
when updating/inserting News&Events etc.

### FIXED: Images/Attachments News&Events

### FIXED: Attachments Publications

### FIXED: Error in helper keywordExist

### FIXED: Error in login
