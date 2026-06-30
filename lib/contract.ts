export function buildContractHtml(params: {
  userName: string;
  userEmail: string;
  jobTitle: string;
  company: string;
  city: string;
  workDate: string;
  timeStart: string;
  timeEnd: string;
  totalLv: string;
  totalEur: string;
  contractNumber: string;
}) {
  const { userName, userEmail, jobTitle, company, city, workDate, timeStart, timeEnd, totalLv, totalEur, contractNumber } = params;
  return `
    <h3>Граждански договор № ${contractNumber}</h3>
    <p>Днес, ${workDate}, между:</p>
    <p><strong>ТФ Сървисис ООД</strong>, представлявано от Talent Factor, наричано по-долу "Възложител", от една страна,</p>
    <p>и</p>
    <p><strong>${userName}</strong> (${userEmail}), наричан/а по-долу "Изпълнител", от друга страна,</p>
    <p>се сключи настоящият договор за следното:</p>
    <p><strong>1. Предмет на договора</strong><br/>
    Изпълнителят се задължава да извърши работа на позиция "${jobTitle}" за партньор "${company}", гр. ${city}.</p>
    <p><strong>2. Срок и работно време</strong><br/>
    Работата се извършва на дата ${workDate}, в часовия диапазон ${timeStart} – ${timeEnd}.</p>
    <p><strong>3. Възнаграждение</strong><br/>
    За извършената работа Изпълнителят получава възнаграждение в общ размер на ${totalLv} лв. (${totalEur} €), платимо в срок от 7 работни дни след потвърждение на отработената смяна.</p>
    <p><strong>4. Заключителни разпоредби</strong><br/>
    Настоящият договор се подписва електронно и има силата на саморъчно подписан документ съгласно Закона за електронния документ и електронните удостоверителни услуги.</p>
  `;
}
