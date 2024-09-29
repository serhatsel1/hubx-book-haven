# Hubx-Book-Haven Projesi

Bu proje, Node.js, MongoDB, Express.js ve TypeScript kullanılarak oluşturulmuş bir REST API örneğidir. Proje, kitap bilgilerini depolamak ve yönetmek için bir API sağlar.

## Özellikler

- Kitap ekleme, güncelleme, silme ve listeleme işlemleri.
- Veri doğrulama için Joi kütüphanesi kullanımı.
- Docker ile konteynerleştirme.

## Kurulum

Bu projeyi çalıştırmak için Docker ve Docker Compose'un yüklü olması gerekmektedir.

1. Projeyi klonlayın:

```bash
git clone https://github.com/serhatsel1/hubx-book-haven.git
```

2. Proje dizinine gidin:

```bash
cd hubx-book-haven
```

3. Docker Compose ile uygulamayı başlatın

```bash
docker-compose up -d
```

Bu komut, Docker imajını oluşturacak ve uygulamayı arka planda çalıştıracaktır.

Kullanım
Uygulama, http://localhost:3000 adresinde erişilebilir olacaktır.

## API Dokümantasyonu

API dokümantasyonuna http://localhost:3000/api-docs adresinden erişebilirsiniz. Swagger UI kullanarak API'yi keşfedebilir ve test edebilirsiniz.

## Geliştirme

Geliştirme ortamında çalıştırmak için aşağıdaki komutu kullanabilirsiniz:

```bash
docker-compose up
```

Bu komut, uygulamayı ön planda çalıştıracak ve logları konsolda görüntüleyecektir.

## Test

Testleri çalıştırmak için aşağıdaki komutu kullanabilirsiniz:

```bash
docker-compose run app npm run test
```

## Teknolojiler
* Node.js
* MongoDB
* Express.js
* TypeScript
* Joi
* Docker
* Docker Compose
