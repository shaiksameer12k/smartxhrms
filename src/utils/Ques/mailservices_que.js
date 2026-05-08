import { v4 as uuidv4 } from "uuid";

export let mailQue = [];

export function mailservices_que(mail) {
  let template = {
    id: uuidv4(),
    mail,
    created_at: new Date(),
    retry: 0,
  };
  mailQue.push(template);

  if (mailQue?.length > 0) {
    return runAndVerifyQue();
  }
  return
}

export async function runAndVerifyQue() {
  console.log("mailQue**", mailQue);

  // snapshot the queue so mutations don't affect the loop
  const currentQue = [...mailQue];

  for (let item of currentQue) {
    try {
      await item?.mail;
      // success — remove from queue
      mailQue = mailQue.filter((q) => q.id !== item.id);
      console.log(`✅ Mail ${item.id} sent`);
    } catch (err) {
      console.error(`❌ Mail ${item.id} failed:`, err);

      // remove current failed item
      mailQue = mailQue.filter((q) => q.id !== item.id);

      if (item.retry < 3) {
        // re-add with incremented retry count
        mailQue.push({ ...item, retry: item.retry + 1 });
        console.log(`🔁 Retrying mail ${item.id} (attempt ${item.retry + 1})`);
      } else {
        console.log(`🚫 Mail ${item.id} permanently failed after 3 retries`);
      }
    }
  }

  // if there are retried items, run again
  if (mailQue.length > 0) {
    await runAndVerifyQue();
  }
}
