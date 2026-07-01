export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  actionLabel?: string;
  actionRoute?: string;
}

export function getFaqItems(language: string): FaqItem[] {
  const en = language === 'en';
  return [
    {
      id: '1',
      category: 'AIA Prestige',
      question: en ? 'How do I check my benefit history?' : 'ตรวจสอบประวัติสิทธิประโยชน์ได้อย่างไร?',
      answer: en
        ? 'View all details under "My Benefits" in your profile menu.'
        : 'ดูรายละเอียดทั้งหมดได้ที่เมนู "คู่ของของฉัน" ในหน้าโปรไฟล์ของคุณ',
      actionLabel: en ? 'View Profile →' : 'ดูโปรไฟล์ →',
      actionRoute: 'ProfileEdit',
    },
    {
      id: '2',
      category: 'AIA+',
      question: en ? 'How do I download my premium payment certificate?' : 'ดาวน์โหลดหนังสือรับรองการชำระเบี้ยฯ ได้อย่างไร?',
      answer: en
        ? 'Go to the "Policy" tab, select "Request Policy Documents". You can download as PDF or request it by email.'
        : 'ไปที่แท็บ "กรมธรรม์" แล้วเลือก "ขอเอกสารกรมธรรม์" คุณสามารถดาวน์โหลด PDF หรือขอให้ส่งทางอีเมลได้',
    },
    {
      id: '3',
      category: 'AIA+ Point',
      question: en ? 'What are AIA+ Points?' : 'AIA+ Point คืออะไร?',
      answer: en
        ? 'AIA+ Points are reward points earned from app usage that can be redeemed for exclusive privileges.'
        : 'AIA+ Point คือระบบแต้มสะสมจากการใช้งานแอป สามารถแลกเป็นสิทธิพิเศษต่างๆ ได้',
    },
    {
      id: '4',
      category: 'AIA+',
      question: en ? 'How do I change my AIA+ password?' : 'เปลี่ยนรหัสผ่าน AIA+ อย่างไร?',
      answer: en
        ? 'Go to the "Account" tab, select "Change Password". Enter your old and new password, then confirm.'
        : 'ไปที่แท็บ "บัญชี" แล้วเลือก "เปลี่ยนรหัสผ่าน" กรอกรหัสเก่าและรหัสใหม่ จากนั้นกดยืนยัน',
    },
    {
      id: '5',
      category: 'AIA+ Point',
      question: en ? 'How do I change my billing frequency?' : 'จะเปลี่ยนงวดชำระเบี้ยฯ ได้อย่างไร?',
      answer: en
        ? 'You can change the billing frequency in the AIA+ app under "Premium Management" → "Expenses & Installments".'
        : 'คุณสามารถเปลี่ยนงวดการชำระได้ผ่านแอป AIA+ ที่เมนู "การจัดการเบี้ย" → "ค่าใช้จ่าย & การผ่อน"',
      actionLabel: en ? 'Change Now →' : 'เปลี่ยนได้เลย →',
      actionRoute: 'ChangeFreq',
    },
    {
      id: '6',
      category: 'AIA Prestige',
      question: en ? 'How can I claim additional benefits or use a benefit twice at the same time?' : 'ฉันสามารถเคลมสิทธิประโยชน์เพิ่มเติมหรือใช้สิทธิ์สองครั้งพร้อมกันได้อย่างไร?',
      answer: en
        ? 'To claim additional benefits or use a benefit twice simultaneously, please contact our AIA call center at 1581 or visit the nearest AIA branch. For certain add-on riders, you can submit through the AIA+ app under "Claims" → "Submit New Claim" and select the relevant benefit type.'
        : 'หากต้องการเคลมสิทธิประโยชน์เพิ่มเติมหรือใช้สิทธิ์สองครั้งพร้อมกัน กรุณาติดต่อศูนย์บริการ AIA ที่ 1581 หรือเยี่ยมสาขา AIA ใกล้บ้านท่าน สำหรับสัญญาเพิ่มเติมบางประเภท สามารถยื่นผ่านแอป AIA+ ที่เมนู "เคลม" → "ยื่นเคลมใหม่"',
    },
    {
      id: '7',
      category: 'AIA+',
      question: en ? 'What documents should I prepare for the claim submission via AIA+?' : 'ต้องเตรียมเอกสารอะไรบ้างสำหรับการยื่นเคลมผ่าน AIA+?',
      answer: en
        ? 'For claim submission via AIA+, please prepare: (1) Medical certificate from the attending physician, (2) Original receipts or payment proof, (3) Diagnosis certificate if applicable, (4) Your bank account details for reimbursement. Upload clear photos of all documents during the "Documents" step of your claim.'
        : 'สำหรับการยื่นเคลมผ่าน AIA+ โปรดเตรียม: (1) ใบรับรองแพทย์จากแพทย์ผู้ตรวจ, (2) ใบเสร็จต้นฉบับหรือหลักฐานการชำระเงิน, (3) ใบรับรองการวินิจฉัย (ถ้ามี), (4) ข้อมูลบัญชีธนาคารสำหรับรับเงินคืน',
      actionLabel: en ? 'Submit Claim →' : 'ยื่นเคลม →',
      actionRoute: 'ClaimStart',
    },
    {
      id: '8',
      category: 'AIA+ Point',
      question: en ? 'How can I check my points balance?' : 'ฉันสามารถตรวจสอบยอดคะแนนได้อย่างไร?',
      answer: en
        ? 'Your AIA+ Points balance is displayed on the Home screen under the "AIA+ Points" section. For full points history and expiry details, go to the "Benefits" tab → "AIA+ Points".'
        : 'ยอดคะแนน AIA+ แสดงบนหน้าหลักใต้ส่วน "AIA+ Point" หากต้องการดูประวัติและวันหมดอายุของคะแนน ให้ไปที่แท็บ "สิทธิประโยชน์" → "AIA+ Point"',
    },
    {
      id: '9',
      category: 'AIA Prestige',
      question: en ? 'Can I cancel a claimed benefit?' : 'ฉันสามารถยกเลิกสิทธิประโยชน์ที่เคลมไปแล้วได้หรือไม่?',
      answer: en
        ? 'Cancellation of a claimed benefit depends on the benefit type and claim status. For claims still in "Pending" status, you may cancel through the AIA+ app or by contacting 1581. Once a benefit is approved and processed, cancellation may not be possible. Please contact our team within 24 hours of claim submission for assistance.'
        : 'การยกเลิกสิทธิประโยชน์ขึ้นอยู่กับประเภทสิทธิ์และสถานะเคลม สำหรับเคลมที่ยังอยู่ในสถานะ "รอดำเนินการ" สามารถยกเลิกได้ผ่านแอป AIA+ หรือโทร 1581 แต่หากได้รับการอนุมัติและดำเนินการแล้ว อาจไม่สามารถยกเลิกได้',
    },
    {
      id: '10',
      category: 'AIA+',
      question: en ? 'How can I see claim result?' : 'ฉันดูผลการเคลมได้อย่างไร?',
      answer: en
        ? 'Claim results are available under the "Claims" tab → "Claim History". You will also receive push notifications and email updates when your claim status changes. Approved claims show payment details including the expected transfer date.'
        : 'ผลการเคลมแสดงอยู่ใต้แท็บ "เคลม" → "ประวัติการเคลม" คุณจะได้รับการแจ้งเตือนและอีเมลเมื่อสถานะเคลมเปลี่ยนแปลง การเคลมที่ได้รับการอนุมัติจะแสดงรายละเอียดการชำระเงิน',
      actionLabel: en ? 'View Claim History →' : 'ดูประวัติเคลม →',
      actionRoute: 'ClaimHistory',
    },
    {
      id: '11',
      category: 'AIA+ Point',
      question: en ? 'When do points expire?' : 'คะแนนจะหมดอายุเมื่อไหร่?',
      answer: en
        ? 'AIA+ Points are valid for 12 months from the date they are earned. You can view individual point expiry dates in the "Benefits" tab → "AIA+ Points" → "Points History".'
        : 'AIA+ Point มีอายุ 12 เดือนนับจากวันที่ได้รับ คุณสามารถดูวันหมดอายุของแต่ละคะแนนได้ที่แท็บ "สิทธิประโยชน์" → "AIA+ Point" → "ประวัติคะแนน"',
    },
    {
      id: '12',
      category: 'AIA Prestige',
      question: en ? 'Where can I ask about AIA products or services?' : 'ฉันสามารถสอบถามเกี่ยวกับผลิตภัณฑ์หรือบริการ AIA ได้ที่ไหน?',
      answer: en
        ? 'You can reach AIA through multiple channels: (1) AIA Call Center: 1581 (available 24/7), (2) AI Assistant in the AIA+ app, (3) Visit any AIA branch office, (4) Contact your personal AIA agent. For urgent matters, please call 1581 directly.'
        : 'คุณสามารถติดต่อ AIA ได้หลายช่องทาง: (1) ศูนย์บริการ AIA: 1581 (เปิด 24 ชั่วโมง), (2) ผู้ช่วย AI ในแอป AIA+, (3) เยี่ยมสาขา AIA ใกล้บ้าน, (4) ติดต่อตัวแทน AIA ของท่าน',
    },
    {
      id: '13',
      category: 'AIA+',
      question: en ? 'Which hospitals are the AIA hospital network?' : 'โรงพยาบาลใดบ้างที่อยู่ในเครือข่าย AIA?',
      answer: en
        ? "AIA's hospital network includes over 1,000 hospitals nationwide. Search for network hospitals in the AIA+ app under \"Benefits\" → \"Hospital Network\" and filter by location or specialty. Network hospitals allow cashless claims without upfront payment."
        : 'เครือข่ายโรงพยาบาลของ AIA มีมากกว่า 1,000 แห่งทั่วประเทศ ค้นหาโรงพยาบาลในเครือข่ายได้ที่แอป AIA+ ใต้ "สิทธิประโยชน์" → "เครือข่ายโรงพยาบาล" โดยกรองตามที่ตั้งหรือความเชี่ยวชาญ',
      actionLabel: en ? 'Find Hospitals →' : 'ค้นหาโรงพยาบาล →',
      actionRoute: 'Benefits',
    },
    {
      id: '14',
      category: 'AIA+ Point',
      question: en ? 'How can I redeem rewards?' : 'ฉันสามารถแลกรางวัลได้อย่างไร?',
      answer: en
        ? 'To redeem AIA+ Point rewards: go to "Benefits" tab → "Rewards", browse available rewards, select your desired reward, and confirm redemption. Points are deducted instantly. Digital rewards are delivered immediately; physical rewards take 7–14 business days.'
        : 'สำหรับการแลกรางวัล AIA+ Point: ไปที่แท็บ "สิทธิประโยชน์" → "รางวัล" เรียกดูรางวัลที่มี เลือกรางวัลที่ต้องการ และยืนยันการแลก คะแนนจะถูกหักทันที รางวัลดิจิทัลได้รับทันที รางวัลของจริงใช้เวลา 7–14 วันทำการ',
    },
    {
      id: '15',
      category: 'AIA+',
      question: en ? 'How can I know the due date for premium payment? The amount? And the payment deadline?' : 'ฉันรู้วันครบกำหนดชำระเบี้ย จำนวนเงิน และกำหนดชำระได้อย่างไร?',
      answer: en
        ? 'Premium due dates and amounts are displayed on the Home screen under your policy card. For the full yearly payment schedule, go to "Premium Management" → "Payment Schedule". AIA sends reminder notifications 30, 14, and 7 days before your due date.'
        : 'วันครบกำหนดและจำนวนเบี้ยแสดงบนหน้าหลักใต้การ์ดกรมธรรม์ของท่าน สำหรับตารางการชำระทั้งปี ไปที่ "การจัดการเบี้ย" → "ตารางการชำระ" AIA จะส่งการแจ้งเตือน 30, 14 และ 7 วันก่อนครบกำหนด',
      actionLabel: en ? 'View Schedule →' : 'ดูตารางชำระ →',
      actionRoute: 'Costs',
    },
    {
      id: '16',
      category: 'AIA+ Point',
      question: en ? 'What types of rewards are available?' : 'มีรางวัลประเภทใดบ้างให้แลก?',
      answer: en
        ? 'AIA+ Points can be redeemed for: (1) Discount vouchers at partner merchants, (2) Health & wellness products, (3) One-month premium waiver, (4) Charitable donations, (5) AIA merchandise. New rewards are added monthly — check the "Rewards" section for current offerings.'
        : 'AIA+ Point สามารถแลกได้: (1) คูปองส่วนลดที่ร้านค้าพาร์ทเนอร์, (2) ผลิตภัณฑ์สุขภาพและความเป็นอยู่ที่ดี, (3) ยกเว้นเบี้ยหนึ่งเดือน, (4) บริจาคการกุศล, (5) สินค้า AIA รางวัลใหม่จะเพิ่มทุกเดือน',
    },
    {
      id: '17',
      category: 'AIA+',
      question: en ? 'How can I pay premium?' : 'ฉันชำระเบี้ยประกันได้อย่างไร?',
      answer: en
        ? 'Premium can be paid through the AIA+ app via: (1) Credit/Debit card, (2) QR code (PromptPay), (3) Online banking, (4) AutoPay (automatic deduction). Go to "Home" → "Pay Premium" to start. You can also pay at any AIA branch or via bank transfer.'
        : 'ชำระเบี้ยผ่านแอป AIA+ ได้ด้วย: (1) บัตรเครดิต/เดบิต, (2) QR Code (พร้อมเพย์), (3) ธนาคารออนไลน์, (4) AutoPay (หักอัตโนมัติ) ไปที่ "หน้าหลัก" → "ชำระเบี้ย" เพื่อเริ่มต้น',
      actionLabel: en ? 'Pay Now →' : 'ชำระเลย →',
      actionRoute: 'PaySelect',
    },
    {
      id: '18',
      category: 'AIA+ Point',
      question: en ? 'How many points are required for redemption?' : 'ต้องใช้คะแนนเท่าไหร่สำหรับการแลกรางวัล?',
      answer: en
        ? "Minimum redemption is 100 points. Discount vouchers start from 200 points, health products from 500 points, and a premium waiver requires 2,000 points. Check each reward's point requirement in the \"Rewards\" catalog."
        : 'การแลกขั้นต่ำคือ 100 คะแนน คูปองส่วนลดเริ่มต้นที่ 200 คะแนน ผลิตภัณฑ์สุขภาพเริ่มที่ 500 คะแนน และการยกเว้นเบี้ยต้องใช้ 2,000 คะแนน ตรวจสอบจำนวนคะแนนที่ต้องใช้แต่ละรางวัลในแคตตาล็อก',
    },
    {
      id: '19',
      category: 'AIA+',
      question: en ? 'When will my credit card or account be charged if I register AutoPay?' : 'บัตรเครดิตหรือบัญชีจะถูกตัดเงินเมื่อไหร่หากฉันลงทะเบียน AutoPay?',
      answer: en
        ? 'If you have registered AutoPay, your credit card or bank account will be charged 3 business days before your premium due date. You will receive a notification 5 days prior to the charge. Ensure sufficient funds are available to avoid payment failure and policy lapse.'
        : 'หากลงทะเบียน AutoPay บัตรเครดิตหรือบัญชีธนาคารจะถูกตัดเงิน 3 วันทำการก่อนวันครบกำหนด คุณจะได้รับการแจ้งเตือน 5 วันก่อนวันตัดเงิน กรุณามั่นใจว่ามีวงเงินเพียงพอ',
    },
    {
      id: '20',
      category: 'AIA+ Point',
      question: en ? 'Can I cancel after redeeming?' : 'ฉันสามารถยกเลิกหลังจากแลกรางวัลแล้วได้หรือไม่?',
      answer: en
        ? 'Cancellation depends on the reward type. Digital vouchers and instant rewards cannot be cancelled once redeemed. Physical product orders can be cancelled within 24 hours before shipping. Please contact AIA at 1581 or use in-app chat to request a cancellation.'
        : 'การยกเลิกขึ้นอยู่กับประเภทรางวัล คูปองดิจิทัลและรางวัลทันทีไม่สามารถยกเลิกได้ คำสั่งซื้อสินค้าจริงสามารถยกเลิกได้ภายใน 24 ชั่วโมงก่อนจัดส่ง กรุณาติดต่อ AIA ที่ 1581 หรือแชทในแอป',
    },
    {
      id: '21',
      category: 'AIA+',
      question: en ? 'If my policy has lapsed, how can I renew it?' : 'หากกรมธรรม์ขาดอายุ ฉันจะต่ออายุได้อย่างไร?',
      answer: en
        ? "To reinstate a lapsed policy: (1) Contact AIA at 1581 or visit an AIA branch within the grace period (30 days after lapse), (2) Submit a health declaration form if required, (3) Pay all overdue premiums plus any applicable interest. Reinstatement is subject to AIA's approval and health assessment."
        : 'สำหรับการต่ออายุกรมธรรม์ที่ขาด: (1) ติดต่อ AIA ที่ 1581 หรือเยี่ยมสาขาภายในระยะผ่อนผัน (30 วันหลังขาดอายุ), (2) ยื่นแบบฟอร์มประกาศสุขภาพ (ถ้าจำเป็น), (3) ชำระเบี้ยค้างชำระพร้อมดอกเบี้ย',
    },
    {
      id: '22',
      category: 'AIA+ Point',
      question: en ? 'What should I do if I have issues with points or reward redemption?' : 'ฉันควรทำอย่างไรหากมีปัญหาเกี่ยวกับคะแนนหรือการแลกรางวัล?',
      answer: en
        ? 'For points or redemption issues: (1) Check your points history for transaction details, (2) Contact our support team via in-app chat (available 24/7), (3) Call AIA at 1581, or (4) Email us at aia.support@aia.co.th. Please have your policy number and transaction details ready.'
        : 'สำหรับปัญหาคะแนนหรือการแลกรางวัล: (1) ตรวจสอบประวัติคะแนนสำหรับรายละเอียดธุรกรรม, (2) ติดต่อทีมสนับสนุนผ่านแชทในแอป (เปิด 24 ชั่วโมง), (3) โทร 1581, (4) อีเมล aia.support@aia.co.th',
    },
    {
      id: '23',
      category: 'AIA+',
      question: en ? 'If I lost my policy, how can I request a new one?' : 'หากฉันทำกรมธรรม์หาย จะขอใบใหม่ได้อย่างไร?',
      answer: en
        ? 'To request a replacement policy document: go to "Policy" tab → "Policy Documents" → "Request Document", or contact AIA at 1581. A processing fee may apply for physical document replacement. Your digital policy certificate is always available in the app under "Policy Documents".'
        : 'สำหรับการขอกรมธรรม์ทดแทน: ไปที่แท็บ "กรมธรรม์" → "เอกสารกรมธรรม์" → "ขอเอกสาร" หรือติดต่อ AIA ที่ 1581 อาจมีค่าธรรมเนียมสำหรับเอกสารจริง กรมธรรม์ดิจิทัลพร้อมใช้งานในแอปตลอดเวลา',
    },
    {
      id: '24',
      category: 'AIA+ Point',
      question: en ? 'Can I transfer points to someone else?' : 'ฉันสามารถโอนคะแนนให้ผู้อื่นได้หรือไม่?',
      answer: en
        ? 'AIA+ Points are non-transferable and tied to your individual policy and account. Points cannot be transferred to another person, combined with another account, or converted to cash. Each AIA+ policyholder maintains their own separate points balance.'
        : 'AIA+ Point ไม่สามารถโอนได้และผูกกับกรมธรรม์และบัญชีของท่านเอง คะแนนไม่สามารถโอนให้ผู้อื่น รวมกับบัญชีอื่น หรือแปลงเป็นเงินสดได้',
    },
    {
      id: '25',
      category: 'AIA+',
      question: en ? 'How can I change address?' : 'ฉันสามารถเปลี่ยนที่อยู่ได้อย่างไร?',
      answer: en
        ? 'To update your address: go to "Account" tab → "Edit Profile" → "Personal Information" → "Address". Enter your new address and upload proof of address (e.g., utility bill or bank statement). Changes are processed within 3–5 business days. You can also visit any AIA branch with your ID card.'
        : 'สำหรับการอัปเดตที่อยู่: ไปที่แท็บ "บัญชี" → "แก้ไขโปรไฟล์" → "ข้อมูลส่วนตัว" → "ที่อยู่" กรอกที่อยู่ใหม่และอัปโหลดเอกสารยืนยัน การเปลี่ยนแปลงจะดำเนินการภายใน 3–5 วันทำการ',
      actionLabel: en ? 'Edit Profile →' : 'แก้ไขโปรไฟล์ →',
      actionRoute: 'ProfileEdit',
    },
    {
      id: '26',
      category: 'AIA+',
      question: en ? 'How can I change beneficiary?' : 'ฉันสามารถเปลี่ยนผู้รับผลประโยชน์ได้อย่างไร?',
      answer: en
        ? 'To change your beneficiary: visit an AIA branch with your original policy document and ID card, or download and complete the "Beneficiary Change Form" from the AIA website and submit it to any AIA branch. This change requires a physical signature and cannot be made through the app.'
        : 'สำหรับการเปลี่ยนผู้รับผลประโยชน์: เยี่ยมสาขา AIA พร้อมกรมธรรม์ฉบับจริงและบัตรประชาชน หรือดาวน์โหลดแบบฟอร์ม "เปลี่ยนผู้รับผลประโยชน์" จากเว็บ AIA แล้วส่งที่สาขา การเปลี่ยนแปลงนี้ต้องมีลายเซ็นจริง',
    },
    {
      id: '27',
      category: 'AIA+',
      question: en ? 'What is a policy loan? How can I do that?' : 'สินเชื่อกรมธรรม์คืออะไร? ทำได้อย่างไร?',
      answer: en
        ? "A policy loan allows you to borrow against your policy's accumulated cash value (up to 80%). To apply, contact AIA at 1581 or visit an AIA branch. The loan accrues interest (typically 6–8% per annum) and must be repaid to keep your policy active. Only available on eligible whole life and endowment policies."
        : 'สินเชื่อกรมธรรม์คือการกู้ยืมเงินจากมูลค่าเงินสดสะสมของกรมธรรม์ (สูงสุด 80%) สำหรับการสมัคร ติดต่อ AIA ที่ 1581 หรือเยี่ยมสาขา เงินกู้มีดอกเบี้ย (โดยทั่วไป 6–8% ต่อปี)',
    },
    {
      id: '28',
      category: 'AIA+',
      question: en ? 'How can I check if the auto-policy loan has been used to pay my premium?' : 'ฉันตรวจสอบได้อย่างไรว่าสินเชื่อกรมธรรม์อัตโนมัติถูกนำไปชำระเบี้ยหรือไม่?',
      answer: en
        ? 'Check auto-policy loan usage in the AIA+ app under "Policy" → "Policy Details" → "Loan Information", or call AIA at 1581. If an auto-policy loan was used, you will receive a notification and can see the outstanding loan balance and accrued interest in your policy details.'
        : 'ตรวจสอบการใช้สินเชื่อกรมธรรม์อัตโนมัติในแอป AIA+ ที่ "กรมธรรม์" → "รายละเอียดกรมธรรม์" → "ข้อมูลสินเชื่อ" หรือโทร 1581 หากมีการใช้สินเชื่อ คุณจะได้รับการแจ้งเตือน',
    },
    {
      id: '29',
      category: 'AIA+',
      question: en ? 'If the auto-policy loan has been used, how can I close the loan?' : 'หากมีการใช้สินเชื่อกรมธรรม์อัตโนมัติ ฉันสามารถปิดสินเชื่อได้อย่างไร?',
      answer: en
        ? "To close an auto-policy loan: visit any AIA branch with your policy document, or contact AIA at 1581 for payment options. You can repay the full loan amount plus accrued interest at any time. Partial repayments are also accepted. Once repaid, your policy's cash value is fully restored."
        : 'สำหรับการปิดสินเชื่อกรมธรรม์อัตโนมัติ: เยี่ยมสาขา AIA พร้อมกรมธรรม์ หรือติดต่อ 1581 เพื่อตัวเลือกการชำระ สามารถชำระเต็มจำนวนพร้อมดอกเบี้ยได้ทุกเมื่อ การชำระบางส่วนก็ได้รับการยอมรับ',
    },
    {
      id: '30',
      category: 'AIA+',
      question: en ? 'How can I check the status for dividend payout and coupon payout?' : 'ฉันตรวจสอบสถานะการจ่ายเงินปันผลและคูปองได้อย่างไร?',
      answer: en
        ? 'Dividend and coupon payout status is available under "Policy" tab → "Policy Details" → "Dividends & Coupons". You will receive notifications when payouts are processed. Payouts are typically credited to your registered bank account within 5–7 business days of the payout date.'
        : 'สถานะการจ่ายเงินปันผลและคูปองอยู่ที่แท็บ "กรมธรรม์" → "รายละเอียดกรมธรรม์" → "เงินปันผลและคูปอง" คุณจะได้รับการแจ้งเตือนเมื่อมีการดำเนินการ เงินจะโอนเข้าบัญชีภายใน 5–7 วันทำการ',
    },
    {
      id: '31',
      category: 'AIA+',
      question: en ? 'What are the available methods for receiving dividend payout, coupon payout, or maturity benefits?' : 'มีวิธีใดบ้างในการรับเงินปันผล คูปอง หรือผลประโยชน์ครบกำหนด?',
      answer: en
        ? 'You can receive dividend, coupon, or maturity payouts via: (1) Direct bank transfer to your registered account, (2) Cheque by mail to your registered address, (3) Cash at any AIA branch. To set or change your preferred payout method, go to "Account" → "Payment Settings" or contact AIA at 1581.'
        : 'คุณสามารถรับเงินปันผล คูปอง หรือผลประโยชน์ครบกำหนดผ่าน: (1) โอนเข้าบัญชีธนาคารที่ลงทะเบียน, (2) เช็คทางไปรษณีย์, (3) เงินสดที่สาขา AIA ไปที่ "บัญชี" → "การตั้งค่าการชำระ" เพื่อตั้งค่าวิธีรับเงิน',
    },
    {
      id: '32',
      category: 'AIA+',
      question: en ? 'How can I receive dividend coupon or payout coupon directly to my bank account without contacting an agent?' : 'ฉันสามารถรับคูปองเงินปันผลหรือคูปองการจ่ายเงินเข้าบัญชีธนาคารโดยตรงโดยไม่ต้องติดต่อตัวแทนได้อย่างไร?',
      answer: en
        ? 'To receive coupons directly to your bank account: go to "Account" tab → "Payment Settings" → "Payout Preferences", select "Bank Transfer", and enter your bank account details. Once registered, future dividends and coupons will be transferred automatically without needing to contact your agent.'
        : 'สำหรับการรับคูปองเข้าบัญชีธนาคารโดยตรง: ไปที่แท็บ "บัญชี" → "การตั้งค่าการชำระ" → "ตั้งค่าการรับเงิน" เลือก "โอนเข้าบัญชี" และกรอกรายละเอียดบัญชี เมื่อลงทะเบียนแล้ว เงินปันผลและคูปองจะโอนอัตโนมัติ',
    },
    {
      id: '33',
      category: 'AIA+',
      question: en ? 'If I want AIA to automatically use my dividends to pay my premiums, what should I do?' : 'หากฉันต้องการให้ AIA นำเงินปันผลไปชำระเบี้ยอัตโนมัติ ต้องทำอย่างไร?',
      answer: en
        ? 'To set up automatic dividend reinvestment for premium payment: contact AIA at 1581 or visit an AIA branch. Complete the "Dividend Application Form" and select "Apply to Premium Payment". This ensures your policy remains active by using accumulated dividends to cover premium payments automatically.'
        : 'สำหรับการตั้งค่าการนำเงินปันผลไปชำระเบี้ยอัตโนมัติ: ติดต่อ AIA ที่ 1581 หรือเยี่ยมสาขา กรอกแบบฟอร์ม "การขอเงินปันผล" และเลือก "นำไปชำระเบี้ย" เพื่อให้กรมธรรม์ยังคงมีผลใช้บังคับ',
    },
    {
      id: '34',
      category: 'Vitality',
      question: en ? 'How can I apply for AIA Vitality Plus?' : 'ฉันสมัคร AIA Vitality Plus ได้อย่างไร?',
      answer: en
        ? 'To apply for AIA Vitality Plus: go to "Benefits" tab → "Vitality" → "Join Vitality Plus", or contact your AIA agent. AIA Vitality Plus is available to all AIA+ policyholders. The annual membership fee is 1,200 THB, providing access to health tracking, exclusive rewards, and potential premium discounts.'
        : 'สำหรับการสมัคร AIA Vitality Plus: ไปที่แท็บ "สิทธิประโยชน์" → "Vitality" → "สมัคร Vitality Plus" หรือติดต่อตัวแทน AIA ของท่าน AIA Vitality Plus เปิดให้ผู้ถือกรมธรรม์ AIA+ ทุกคน ค่าสมาชิกรายปี 1,200 บาท',
      actionLabel: en ? 'View Vitality →' : 'ดู Vitality →',
      actionRoute: 'Vitality',
    },
    {
      id: '35',
      category: 'Vitality',
      question: en ? 'How can I see my AIA Vitality card?' : 'ฉันดูบัตร AIA Vitality ได้อย่างไร?',
      answer: en
        ? 'Your AIA Vitality digital card is in "Benefits" tab → "Vitality" → "My Vitality Card". The card shows your Vitality status (Bronze, Silver, Gold, Platinum), membership number, and validity. Present this card at partner health facilities to access discounts and exclusive benefits.'
        : 'บัตร AIA Vitality ดิจิทัลของท่านอยู่ที่แท็บ "สิทธิประโยชน์" → "Vitality" → "บัตร Vitality ของฉัน" บัตรแสดงระดับ Vitality (บรอนซ์ ซิลเวอร์ โกลด์ แพลตทินัม) หมายเลขสมาชิก และวันหมดอายุ',
      actionLabel: en ? 'View Vitality →' : 'ดู Vitality →',
      actionRoute: 'Vitality',
    },
    {
      id: '36',
      category: 'Vitality',
      question: en ? 'How can I renew or cancel AIA Vitality membership?' : 'ฉันสามารถต่ออายุหรือยกเลิกสมาชิก AIA Vitality ได้อย่างไร?',
      answer: en
        ? 'Your Vitality membership renews automatically on the anniversary date and the annual fee is charged to your registered payment method. To cancel: go to "Account" → "Membership Settings" → "Vitality Plus" → "Cancel Membership" before the renewal date, or call 1581. Cancellation takes effect at the end of the current membership year.'
        : 'สมาชิก Vitality ต่ออายุอัตโนมัติในวันครบรอบ และตัดค่าธรรมเนียมจากวิธีชำระที่ลงทะเบียน สำหรับการยกเลิก: ไปที่ "บัญชี" → "การตั้งค่าสมาชิก" → "Vitality Plus" → "ยกเลิกสมาชิก" ก่อนวันต่ออายุ หรือโทร 1581',
    },
    {
      id: '37',
      category: 'Vitality',
      question: en ? 'How can I pay premium for AIA Vitality Plus?' : 'ฉันชำระเบี้ย AIA Vitality Plus ได้อย่างไร?',
      answer: en
        ? 'AIA Vitality Plus annual premium (1,200 THB) can be paid through the AIA+ app: go to "Benefits" → "Vitality" → "Pay Membership Fee". Accepted methods include Credit/Debit card, QR code (PromptPay), or AutoPay. The fee is charged annually on your membership anniversary date.'
        : 'เบี้ย AIA Vitality Plus รายปี (1,200 บาท) ชำระผ่านแอป AIA+: ไปที่ "สิทธิประโยชน์" → "Vitality" → "ชำระค่าสมาชิก" รองรับบัตรเครดิต/เดบิต, QR Code (พร้อมเพย์) หรือ AutoPay ค่าธรรมเนียมตัดทุกปีในวันครบรอบ',
      actionLabel: en ? 'View Vitality →' : 'ดู Vitality →',
      actionRoute: 'Vitality',
    },
    {
      id: '38',
      category: 'Vitality',
      question: en ? 'If I forgot to pay AIA Vitality Plus premium, what should I do?' : 'หากฉันลืมชำระเบี้ย AIA Vitality Plus ควรทำอย่างไร?',
      answer: en
        ? 'If you missed your Vitality Plus renewal payment, you have a 30-day grace period to make payment without losing your membership status or accumulated points. Go to "Benefits" → "Vitality" → "Pay Now", or call AIA at 1581. After the grace period, your membership will be suspended and points may be forfeited.'
        : 'หากพลาดการชำระต่ออายุ Vitality Plus คุณมีระยะผ่อนผัน 30 วันเพื่อชำระโดยไม่สูญเสียสถานะสมาชิกหรือคะแนนสะสม ไปที่ "สิทธิประโยชน์" → "Vitality" → "ชำระเลย" หรือโทร 1581',
    },
    {
      id: '39',
      category: 'Vitality',
      question: en ? 'How can I check points that I earned from my latest activity?' : 'ฉันตรวจสอบคะแนนที่ได้รับจากกิจกรรมล่าสุดได้อย่างไร?',
      answer: en
        ? 'Recent Vitality activity points are shown in "Benefits" tab → "Vitality" → "Activity History". Points from connected devices and apps are typically credited within 24–48 hours after the activity. You can also view weekly and monthly point summaries from the same screen.'
        : 'คะแนนกิจกรรม Vitality ล่าสุดแสดงที่แท็บ "สิทธิประโยชน์" → "Vitality" → "ประวัติกิจกรรม" คะแนนจากอุปกรณ์และแอปที่เชื่อมต่อจะได้รับการเครดิตภายใน 24–48 ชั่วโมงหลังกิจกรรม',
      actionLabel: en ? 'View Vitality →' : 'ดู Vitality →',
      actionRoute: 'Vitality',
    },
    {
      id: '40',
      category: 'Vitality',
      question: en ? "If I don't have a smartwatch, can I still earn exercise points using my mobile phone?" : 'หากฉันไม่มีสมาร์ทวอทช์ ยังสามารถรับคะแนนออกกำลังกายผ่านโทรศัพท์ได้หรือไม่?',
      answer: en
        ? 'Yes! You can earn exercise points using your mobile phone by connecting Apple Health (iPhone) or Google Fit (Android) to your AIA Vitality account. Steps and active minutes tracked by your phone are counted towards your activity goals. Go to "Benefits" → "Vitality" → "Connect Devices" to link your health app.'
        : 'ได้เลย! คุณสามารถรับคะแนนออกกำลังกายผ่านโทรศัพท์โดยเชื่อมต่อ Apple Health (iPhone) หรือ Google Fit (Android) กับบัญชี AIA Vitality ของคุณ จำนวนก้าวและเวลาออกกำลังกายจะนับเข้าเป้าหมายกิจกรรมของคุณ',
    },
    {
      id: '41',
      category: 'Vitality',
      question: en ? 'How can I connect my smartwatch/health app to my AIA Vitality account?' : 'ฉันเชื่อมต่อสมาร์ทวอทช์/แอปสุขภาพกับบัญชี AIA Vitality ได้อย่างไร?',
      answer: en
        ? 'To connect your device: go to "Benefits" tab → "Vitality" → "Connected Devices" → "Add Device". Supported devices include Apple Watch, Garmin, Fitbit, Samsung Galaxy Watch, and health apps like Apple Health and Google Fit. Follow the on-screen authorization steps to complete the connection.'
        : 'สำหรับการเชื่อมต่ออุปกรณ์: ไปที่แท็บ "สิทธิประโยชน์" → "Vitality" → "อุปกรณ์ที่เชื่อมต่อ" → "เพิ่มอุปกรณ์" รองรับ Apple Watch, Garmin, Fitbit, Samsung Galaxy Watch และแอปสุขภาพ ทำตามขั้นตอนการอนุญาตบนหน้าจอ',
      actionLabel: en ? 'View Vitality →' : 'ดู Vitality →',
      actionRoute: 'Vitality',
    },
  ];
}
