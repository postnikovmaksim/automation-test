module.exports = {
    async createUsn({ page }) {
        return page.goto('http://moedelo.org/Tester/CreateUser?FirmRegType=UsnAccountant&PaymentStatus=Trial&PriceList=ProfessionalUsn&WithErReports=False&IsOOO=True&IsENVD=True&IsUsn=True&UsnSize=6&IsEmployer=True&IsOsno=False&FromSite=True');
    }
};
