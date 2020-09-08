<template>
    <div class="container">
            <div class="row justify-content-center">
                <h2 class="section-title">版权服务体系</h2>
                <div class="col-lg-12">
                    <div class="row row-grid">
                        <div class="col-lg-4">
                            <card class="border-0" hover shadow body-classes="py-5">
                                <icon name="ni ni-check-bold" type="primary" rounded class="mb-4">
                                </icon>
                                <h6 class="text-primary text-uppercase">版权监测</h6>
                                <p class="description mt-3">对版权图片或者文本进行实时监测，结合人工智能技术进行比对，无论是图片压缩、剪裁还是摘取部分文字内容，都能轻松进行相似度计算。多节点区块链系统能够进行24小时海量数据监测，让诸多自媒体、营销号侵权行为无处遁形。</p>
                                <base-button tag="a" href="/landing" type="primary" class="mt-4">
                                    了解更多
                                </base-button>
                            </card>
                        </div>
                        <div class="col-lg-4">
                            <card class="border-0" hover shadow body-classes="py-5">
                                <icon name="ni ni-istanbul" type="success" rounded class="mb-4">
                                </icon>
                                <h6 class="text-success text-uppercase">Tendermint共识机制</h6>
                                <p class="description mt-3">使用Tendermint作为底层的共识机制，Tendermint能够容忍至多1/3的节点失效，能够安全复制任何区块链向量机状态，能够确保TPS达到千级以上，并且使用了安全的点对点传输协议，能够保证区块链系统的保证安全性、可信性、扩展性、高效性。</p>
                                <base-button tag="a" href="https://tendermint.com/" type="success" class="mt-4">
                                    了解更多
                                </base-button>
                            </card>
                        </div>
                        <div class="col-lg-4">
                            <card class="border-0" hover shadow body-classes="py-5">
                                <icon name="ni ni-planet" type="warning" rounded class="mb-4">
                                </icon>
                                <h6 class="text-warning text-uppercase">结合MongoDB高效查询</h6>
                                <p class="description mt-3">经常性的检索操作让区块链的查询效率成为不可忽略的环节，传统区块链使用特殊的数据结构存储，我们创新性在每个节点使用MongoDB作为存储引擎，结合Nosql的易用性，大大加快写入和查询效率，能够满足海量互联网图片查询的吞吐量。</p>
                                <base-button tag="a" href="https://www.mongodb.com/" type="warning" class="mt-4">
                                    了解更多
                                </base-button>
                            </card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'serviceIntroduction'
}
</script>

<style lang="scss" scoped>
.section-title {
    margin-bottom: 8vh;
}
</style>