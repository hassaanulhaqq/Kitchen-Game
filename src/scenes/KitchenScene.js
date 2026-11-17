export class KitchenScene extends Phaser.Scene {
    constructor() {
        super('KitchenScene');
    }

    preload() {
        // یہاں ہم گیم کے اثاثے (Assets) لوڈ کریں گے
    }

    create() {
        // پس منظر اور کچن کا ماحول
        this.add.rectangle(640, 360, 1280, 720, 0x34495e);
        
        // ہیڈر اور ٹائتل
        this.add.text(640, 50, '🍳 ننھے شیف - لائیو کچن سمولیشن 🍲', {
            fontSize: '42px',
            fill: '#f1c40f',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // وائس اوور ڈائیلاگ باکس
        let dialogueBg = this.add.rectangle(640, 140, 900, 70, 0xffffff, 0.9).setRadius(20);
        
        this.instructionText = this.add.text(640, 140, 'السَّلَامُ عَلَيْكُمْ دوستو! آج ہمار کچن میں مزیدار پین کیک بنے گا، مَا شَاءَ اللّٰه!', {
            fontSize: '26px',
            fill: '#2c3e50',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // عربی ایکسنٹ میں خوش آمدیدی سلام چلانا
        this.playArabicVoice("السَّلَامُ عَلَيْكُمْ دوستو! آج ہمار کچن میں مزیدار پین کیک بنے گا، مَا شَاءَ اللّٰه!");

        // مکسنگ باؤل اور چولہا اسکرین پر بنانا
        let bowl = this.add.text(400, 450, '🥣', { fontSize: '90px' }).setOrigin(0.5).setInteractive();
        this.add.text(400, 530, 'مکسنگ پیالہ', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        let stove = this.add.text(880, 450, '🔥', { fontSize: '90px' }).setOrigin(0.5).setInteractive();
        this.add.text(880, 530, 'چولہا (Stove)', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        // اجزاء کی ٹرے (میدہ، انڈا، دودھ)
        let flour = this.add.text(300, 280, '🌾', { fontSize: '60px' }).setOrigin(0.5).setInteractive();
        let egg = this.add.text(500, 280, '🥚', { fontSize: '60px' }).setOrigin(0.5).setInteractive();
        let milk = this.add.text(700, 280, '🥛', { fontSize: '60px' }).setOrigin(0.5).setInteractive();
        let honey = this.add.text(900, 280, '🍯', { fontSize: '60px' }).setOrigin(0.5).setInteractive();

        // ڈریگ اینڈ ڈراپ ایونٹس
        this.input.setDraggable([flour, egg, milk, honey]);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject, dropped) => {
            // اگر باؤل کے قریب چھوڑا جائے
            let distance = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, bowl.x, bowl.y);
            if (distance < 100) {
                gameObject.destroy();
                this.playVoice("بہت اچھے! مکسچر میں شامل ہو گیا ہے۔");
                this.instructionText.setText('شاباش! اب ہینڈ وسک سے مکس کریں اور چولہے پر پکائیں۔');
            } else {
                // واپس اپنی جگہ پر لوٹا دیں
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });
    }

    playArabicVoice(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA'; // خالص عربی لہجہ سلام اور ماشاءاللہ کے لیے
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    }

    playVoice(text) {
        if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ur-PK'; // عام ہدایات اردو میں
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    }
}