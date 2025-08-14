const cds = require('@sap/cds');
const SapCfMailer = require("sap-cf-mailer").default;
module.exports = cds.service.impl(function () {
    this.on('sendMail', async () => {
        try {
            const transporter = new SapCfMailer("GmailSMTP"); //enter destination name
            
            const base64pdf=`JVBERi0xLjUKJeLjz9MKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291
                cmNlcyA8PC9Gb250IDw8L0YxIDMgMCBSPj4+Pi9NZWRpYUJveFswIDAgNjEyIDc5Ml0vQ29u
                dGVudHMgNCAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMSAwIFJd
                L0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL0ZvbnQvU3ViVHlwZS9UcnVlVHlw
                ZS9CYXNlRm9udC9UaW1lcy1Sb21hbi9FbmNvZGluZy9XaW5BbnNpRW5jb2Rpbmc+PgplbmRv
                YmoKNCAwIG9iago8PC9MZW5ndGggNjY+PnN0cmVhbQpCBiAgICAgICAgICAgIApIZWxsbyBX
                b3JsZCEKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAy
                IDAgUj4+CmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMTkg
                MDAwMDAgbiAKMDAwMDAwMDY2IDAwMDAwIG4gCjAwMDAwMDAxMzAgMDAwMDAgbiAKMDAwMDAw
                MDE5MSAwMDAwMCBuIAowMDAwMDAwMjU3IDAwMDAwIG4gCnRyYWlsZXIKPDwvUm9vdCA1IDAg
                Ui9TaXplIDY+PgpzdGFydHhyZWYKMjg4CiUlRU9G
                `       ;

            const result = await transporter.sendMail({
                to: "maheshsirsat2001@gmail.com",
                cc: "maheshsirsat2001@gmail.com",
                subject: "Test Mail from BTP System",
                html: "Hope this goes well.",
                attachments:  [{ filename: "sample.pdf",    content: base64pdf,    encoding: "base64"  }]
            });
            return `Email sent successfully w `;

        } catch (error) {
            console.error('Error sending email:', error);
            return `Error sending email: ${error.message}`;
        }
    });
});
